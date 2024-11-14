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
