// Show Splash Screen on First Visit
const hasVisitedBefore = localStorage.getItem('visited');

if (!hasVisitedBefore) {
    setTimeout(() => {
        document.getElementById('splash-screen').style.display = 'none';
        document.querySelector('.container').style.display = 'block';
        localStorage.setItem('visited', 'true');
    }, 2000);
} else {
    document.getElementById('splash-screen').style.display = 'none';
    document.querySelector('.container').style.display = 'block';
}

// Fetch User's Location and Display Sightseeing Spots
navigator.geolocation.getCurrentPosition(
    (position) => {
        const { latitude, longitude } = position.coords;
        fetchSightseeingSpots(latitude, longitude);
    },
    () => {
        document.getElementById('location').textContent = 'Location access denied. Showing popular spots.';
        fetchSightseeingSpots(); // Fetch generic spots if location is unavailable
    }
);

// Fetch Sightseeing Spots Based on Location
function fetchSightseeingSpots(latitude = null, longitude = null) {
    const spotList = document.getElementById('spot-list');
    spotList.innerHTML = ''; // Clear previous spots

    // Mock API response based on location (replace with actual API call)
    const mockSpots = [
        { id: 1, name: 'Eiffel Tower', imgSrc: 'https://example.com/eiffel.jpg', description: 'Iconic Parisian landmark.' },
        { id: 2, name: 'Colosseum', imgSrc: 'https://example.com/colosseum.jpg', description: 'Ancient Roman amphitheater.' },
        { id: 3, name: 'Statue of Liberty', imgSrc: 'https://example.com/liberty.jpg', description: 'Symbol of freedom in New York.' }
    ];

    // Render spots
    mockSpots.forEach(spot => {
        const spotItem = document.createElement('div');
        spotItem.classList.add('spot-item');
        spotItem.innerHTML = `
            <img src="${spot.imgSrc}" alt="${spot.name}">
            <h3>${spot.name}</h3>
            <p class="spot-details">${spot.description}</p>
        `;
        spotList.appendChild(spotItem);
    });

    // Display location
    document.getElementById('location').textContent = latitude && longitude
        ? `Sightseeing spots near: ${latitude.toFixed(2)}, ${longitude.toFixed(2)}`
        : 'Showing popular sightseeing spots worldwide';
}
