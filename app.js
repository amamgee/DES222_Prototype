document.addEventListener('DOMContentLoaded', () => {
  const ipGeolocationUrl = 'https://ipinfo.io/json?token=YOUR_IPINFO_API_KEY';
  let page = 1; // Start at the first page
  let location; // To store the user's location or default fallback
  const mainContent = document.getElementById('main-content');

  // Hide splash screen and show main content after a short delay
  setTimeout(() => {
    document.getElementById('splash-screen').style.display = 'none';
    mainContent.classList.remove('hidden');
  }, 2500);

  // Fetch user's location based on IP
  fetch(ipGeolocationUrl)
    .then(response => response.json())
    .then(data => {
      location = data.city || 'Rome'; // Default to 'Rome' if location is unavailable
      console.log(`Detected location: ${location}`);

      // Load initial photos
      fetchPhotosFromPexels(location, page);

      // Set up infinite scroll listener
      mainContent.addEventListener('scroll', handleScroll); // Bind to main content
    })
    .catch(error => {
      console.error('Error fetching IP location:', error);
      // Fallback to a default location silently
      location = 'Rome';
      fetchPhotosFromPexels(location, page);
      mainContent.addEventListener('scroll', handleScroll);
    });
});

// Function to fetch photos from Pexels API
function fetchPhotosFromPexels(query, page) {
  const apiKey = 'RE9OiIOFqVbNwm4KTxrIiRH7AJDgOar2Vgan24sSj8GK0ruHJfb4IMVk';
  const url = `https://api.pexels.com/v1/search?query=${query}&per_page=10&page=${page}`;

  console.log(`Fetching photos from Pexels for ${query} - Page ${page}`);
  
  fetch(url, {
    headers: { Authorization: apiKey }
  })
    .then(response => response.json())
    .then(data => {
      displayPhotos(data.photos);
    })
    .catch(error => console.error('Error fetching Pexels images:', error));
}

// Function to display photos in the sightseeing feed
function displayPhotos(photos) {
  const sightseeingFeed = document.getElementById('sightseeing-feed');
  photos.forEach(photo => {
    const img = document.createElement('img');
    img.src = photo.src.medium; // Use medium-sized images from Pexels
    img.alt = photo.alt;
    img.classList.add('sightseeing-image');

    sightseeingFeed.appendChild(img);
  });
}

// Infinite Scroll Event Handler
function handleScroll() {
  console.log('Scroll event detected'); // Debugging log for scroll event
  const mainContent = document.getElementById('main-content');
  if (mainContent.scrollHeight - mainContent.scrollTop <= mainContent.clientHeight + 100) {
    console.log('Fetching next page of images'); // Debug log before fetching next page
    page++; // Increment page number to fetch the next set of images
    fetchPhotosFromPexels(location, page); // Fetch next page of images
  }
}
