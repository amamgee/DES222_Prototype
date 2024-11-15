document.addEventListener('DOMContentLoaded', () => {
  const ipGeolocationUrl = 'https://ipinfo.io/77.32.78.146?token=773d706935dfe5';
  let page = 1;
  let location;

  setTimeout(() => {
    document.getElementById('splash-screen').style.display = 'none';
    document.getElementById('login-page').classList.remove('hidden');
  }, 2500);

  document.getElementById('explore-button').addEventListener('click', () => {
    fetch(ipGeolocationUrl)
      .then(response => response.json())
      .then(data => {
        location = data.city || 'Noosa, Australia';
        document.getElementById('user-location').textContent = location;
        document.getElementById('login-page').style.display = 'none';
        document.getElementById('main-content').classList.remove('hidden');
        fetchPhotosFromPexels(location, page);
      })
      .catch(error => {
        console.error('Error fetching IP location:', error);
        location = 'Noosa, Australia';
        document.getElementById('user-location').textContent = location;
        document.getElementById('login-page').style.display = 'none';
        document.getElementById('main-content').classList.remove('hidden');
        fetchPhotosFromPexels(location, page);
      });
  });

  document.getElementById('load-more-button').addEventListener('click', () => {
    page++;
    fetchPhotosFromPexels(location, page);
  });
});

function fetchPhotosFromPexels(query, page) {
  const apiKey = 'RE9OiIOFqVbNwm4KTxrIiRH7AJDgOar2Vgan24sSj8GK0ruHJfb4IMVk';
  const perPage = 50;
  const url = `https://api.pexels.com/v1/search?query=${query}&per_page=${perPage}&page=${page}`;

  fetch(url, { headers: { Authorization: apiKey } })
    .then(response => response.json())
    .then(data => {
      if (data.photos && data.photos.length > 0) {
        displayPhotos(data.photos);
        document.getElementById('load-more-button').classList.remove('hidden');
      }
    })
    .catch(error => console.error('Error fetching Pexels images:', error));
}

function displayPhotos(photos) {
  const sightseeingFeed = document.getElementById('sightseeing-feed');
  photos.forEach(photo => {
    const img = document.createElement('img');
    img.src = photo.src.medium;
    img.alt = photo.alt || 'Sightseeing Image';
    img.classList.add('sightseeing-image');
    sightseeingFeed.appendChild(img);
  });
}
