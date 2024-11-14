document.addEventListener('DOMContentLoaded', () => {
  const ipGeolocationUrl = 'https://ipinfo.io/json?token=YOUR_IPINFO_API_KEY';
  let page = 1; // Track current page for infinite scrolling

  // Hide splash screen and show main content
  setTimeout(() => {
    document.getElementById('splash-screen').style.display = 'none';
    document.getElementById('main-content').classList.remove('hidden');
  }, 2500);

  // Fetch user's location based on IP
  fetch(ipGeolocationUrl)
    .then(response => response.json())
    .then(data => {
      const location = data.city || 'Rome'; // Fallback to 'Rome' if location is unavailable
      console.log(`Detected location: ${location}`);
      
      // Load initial photos
      fetchPhotosFromPexels(location, page);

      // Infinite scroll - load more photos when near the bottom
      window.addEventListener('scroll', () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
          page++; // Increment page number to fetch the next set of images
          fetchPhotosFromPexels(location, page);
        }
      });
    })
    .catch(error => {
      console.error('Error fetching IP location:', error);
      alert('Unable to retrieve your location. Loading default images.');
      fetchPhotosFromPexels('Rome', page); // Default to Rome if IP geolocation fails
    });
});

// Function to fetch photos from Pexels API
function fetchPhotosFromPexels(query, page) {
  const apiKey = 'RE9OiIOFqVbNwm4KTxrIiRH7AJDgOar2Vgan24sSj8GK0ruHJfb4IMVk';
  const url = `https://api.pexels.com/v1/search?query=${query}&per_page=10&page=${page}`;

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
    
    // Trigger reflow on image load for masonry layout
    img.onload = () => {
      sightseeingFeed.style.gridAutoRows = 'auto';
    };

    sightseeingFeed.appendChild(img);
  });
}
