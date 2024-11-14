// Geolocation handling with fallback to IP-based API
navigator.geolocation.getCurrentPosition(function(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    fetchLocationBasedData(latitude, longitude);
}, function(error) {
    // Fallback: Use an IP-based geolocation API if geolocation is denied
    fetch('https://ipapi.co/json/')
        .then(response => response.json())
        .then(data => {
            fetchLocationBasedData(data.latitude, data.longitude);
        })
        .catch(() => {
            document.getElementById('location').textContent = 'Unable to fetch location';
        });
});

function fetchLocationBasedData(latitude, longitude) {
    // Display the user's location
    document.getElementById('latitude').textContent = latitude;
    document.getElementById('longitude').textContent = longitude;

    // Adjust meal type based on local time
    const hours = new Date().getHours();
    let mealType = 'dinner';
    if (hours < 12) mealType = 'breakfast';
    else if (hours >= 12 && hours < 17) mealType = 'lunch';

    fetchRecipes(mealType, latitude, longitude);
}

// Apply dynamic theme based on location
function applyThemeBasedOnLocation(countryCode) {
    const container = document.querySelector('.container');
    if (countryCode === 'IT') { // Example: Italy
        container.style.backgroundColor = '#ffebcd';
        document.body.style.color = '#333';
    } else {
        container.style.backgroundColor = '#f4f4f4';
    }
}

// Fetch location data and apply theme
function fetchLocationAndTheme(latitude, longitude) {
    fetch(`https://geocode.xyz/${latitude},${longitude}?geoit=json`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('location').textContent = `You are in ${data.country}`;
            document.getElementById('flag').src = `https://countryflagsapi.com/png/${data.countrycode.toLowerCase()}`;
            applyThemeBasedOnLocation(data.countrycode);
        });
}

// Add function for toggling recipe details smoothly
function toggleRecipeDetails(recipeItem) {
    const details = recipeItem.querySelector('.recipe-details');
    if (details.style.maxHeight) {
        details.style.maxHeight = null; // Collapse
    } else {
        details.style.maxHeight = details.scrollHeight + "px"; // Expand
    }
}

// Update event listener in `fetchRecipes` function to use toggle
function fetchRecipes(mealType, latitude, longitude) {
    console.log(`Fetching recipes for meal type: ${mealType}`); // Debug log

    const data = mockData; // Use mock data

    const recipeList = document.getElementById('recipe-list');
    recipeList.innerHTML = ''; // Clear previous recipes

    if (data.results && data.results.length > 0) {
        data.results.forEach(recipe => {
            const recipeItem = document.createElement('div');
            recipeItem.className = 'recipe-item';
            recipeItem.innerHTML = `
                <img src="${recipe.imgSrc}" alt="${recipe.title}">
                <h3>${recipe.title}</h3>
                <div class="recipe-details">
                    <p>Details about ${recipe.title}.</p>
                </div>
            `;
            recipeItem.addEventListener('click', () => toggleRecipeDetails(recipeItem)); // Toggle details on click
            recipeList.appendChild(recipeItem);
        });
    } else {
        recipeList.innerHTML = '<div>No recipes found.</div>';
    }
}
