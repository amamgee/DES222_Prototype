document.addEventListener('DOMContentLoaded', () => {
  const ipGeolocationUrl = 'https://ipinfo.io/77.32.78.146?token=773d706935dfe5';
  let page = 1;
  let location;

  // Hide splash screen after a short delay and show the login page
  setTimeout(() => {
    document.getElementById('splash-screen').style.display = 'none';
    document.getElementById('login-page').classList.remove('hidden');
  }, 2500);

  // Handle the Explore button click
  document.getElementById('explore-button').addEventListener('click', () => {
    // Fetch user's IP location
    fetch(ipGeolocationUrl)
      .then(response => response.json())
      .then(data => {
        location = data.city || 'Noosa, Australia'; // Fallback to hardcoded location
        console.log(`Detected location: ${location}`);

        // Transition to the main content
        document.getElementById('login-page').style.display = 'none';
        document.getElementById('main-content').classList.remove('hidden');

        // Load initial photos
        fetchPhotosFromPexels(location, page);

        // Set up infinite scroll listener
        window.addEventListener('scroll', handleScroll);
      })
      .catch(error => {
        console.error('Error fetching IP location:', error);
        alert('Unable to determine location. Loading default content.');

        // Fallback to default location
        location = 'Noosa, Australia';
        document.getElementById('login-page').style.display = 'none';
        document.getElementById('main-content').classList.remove('hidden');

        fetchPhotosFromPexels(location, page);
        window.addEventListener('scroll', handleScroll);
      });
  });
});

// Function to fetch photos from Pexels API
function fetchPhotosFromPexels(query, page) {
  const apiKey = 'RE9OiIOFqVbNwm4KTxrIiRH7AJDgOar2Vgan24sSj8GK0ruHJfb4IMVk';
  const perPage = 50; // Fetch 50 images per request
  const url = `https://api.pexels.com/v1/search?query=${query}&per_page=${perPage}&page=${page}`;

  console.log(`Fetching photos from Pexels for ${query} - Page ${page}, ${perPage} per page`);

  fetch(url, {
    headers: { Authorization: apiKey }
  })
    .then(response => response.json())
    .then(data => {
      console.log('Pexels API response:', data); // Debugging output
      if (data.photos && data.photos.length > 0) {
        displayPhotos(data.photos);
      } else {
        console.warn('No photos returned from Pexels API for this query.');
      }
    })
    .catch(error => console.error('Error fetching Pexels images:', error));
}

// Function to display photos in the sightseeing feed
function displayPhotos(photos) {
  const sightseeingFeed = document.getElementById('sightseeing-feed');
  photos.forEach(photo => {
    const img = document.createElement('img');
    img.src = photo.src.medium; // Use medium-sized images from Pexels
    img.alt = photo.alt || 'Sightseeing Image';
    img.classList.add('sightseeing-image');

    sightseeingFeed.appendChild(img);
  });
}

// Infinite Scroll Event Handler
function handleScroll() {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
    console.log('Fetching next page of images');
    page++;
    fetchPhotosFromPexels(location, page);
  }
}
