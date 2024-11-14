document.addEventListener('DOMContentLoaded', () => {
  // Hide splash screen and show main content
  setTimeout(() => {
    document.getElementById('splash-screen').style.display = 'none';
    document.getElementById('main-content').classList.remove('hidden');
  }, 2500);

  // Check geolocation support
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showNearbySightseeing, handleError);
  } else {
    alert('Geolocation is not supported by this browser.');
  }
});

// Fetch and display nearby sightseeing locations
function showNearbySightseeing(position) {
  const sightseeingSpots = [
    { name: 'Colosseum', img: 'https://example.com/colosseum.jpg' },
    { name: 'Trevi Fountain', img: 'https://example.com/trevi-fountain.jpg' },
  ];

  const sightseeingFeed = document.getElementById('sightseeing-feed');

  sightseeingSpots.forEach(spot => {
    const card = document.createElement('div');
    card.className = 'sightseeing-card';

    const img = document.createElement('img');
    img.src = spot.img;
    img.alt = spot.name;

    const content = document.createElement('div');
    content.className = 'sightseeing-card-content';
    content.innerHTML = `<h2>${spot.name}</h2>`;

    card.appendChild(img);
    card.appendChild(content);
    sightseeingFeed.appendChild(card);
  });
}

function handleError(error) {
  alert('Unable to retrieve your location for sightseeing suggestions.');
}

document.addEventListener('DOMContentLoaded', () => {
  const location = 'Rome'; // Replace with a dynamic location if possible
  let page = 1; // Track current page for infinite scrolling

  // Load initial photos
  fetchPhotosFromPexels(location, page);

  // Infinite scroll - load more photos when near the bottom
  window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
      page++; // Increment page number to fetch the next set of images
      fetchPhotosFromPexels(location, page);
    }
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
}
