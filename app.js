document.addEventListener('DOMContentLoaded', () => {
  const ipGeolocationUrl = 'https://ipinfo.io/json?token=YOUR_IPINFO_API_KEY';
  let page = 1; // Track current page for infinite scrolling
  let masonry; // Variable for Masonry instance

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
      // Secret fallback to "Rome" without notifying the user
      fetchPhotosFromPexels('Rome', page);
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
    
    sightseeingFeed.appendChild(img);
  });

  // Wait for images to load before applying Masonry layout
  imagesLoaded(sightseeingFeed, () => {
    initializeMasonry();
  });
}

// Initialize Masonry layout
function initializeMasonry() {
  if (!masonry) {
    masonry = new Masonry('#sightseeing-feed', {
      itemSelector: '.sightseeing-image',
      columnWidth: 200,
      gutter: 10,
      fitWidth: true
    });
  } else {
    masonry.layout(); // Refresh Masonry layout
  }
}
