// Splash screen logic
const hasVisitedBefore = localStorage.getItem('visited');

if (!hasVisitedBefore) {
    setTimeout(() => {
        document.getElementById('splash-screen').style.display = 'none';
        document.querySelector('.container').style.display = 'block';
        localStorage.setItem('visited', 'true');
    }, 2000); // Show splash for 2 seconds
} else {
    document.getElementById('splash-screen').style.display = 'none';
    document.querySelector('.container').style.display = 'block';
}

// Geolocation handling with fallback to IP-based API
navigator.geolocation.getCurrentPosition(
    function(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        fetchLocationAndApplyTheme(latitude, longitude);
    },
    function(error) {
        // Fallback: Use an IP-based geolocation API if geolocation is denied
        fetch('https://ipapi.co/json/')
            .then(response => response.json())
            .then(data => fetchLocationAndApplyTheme(data.latitude, data.longitude))
            .catch(() => document.getElementById('location').textContent = 'Unable to fetch location');
    }
);

function fetchLocationAndApplyTheme(latitude, longitude) {
    fetch(`https://geocode.xyz/${latitude},${longitude}?geoit=json`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('location').textContent = `You are in ${data.country}`;
            document.getElementById('flag').src = `https://countryflagsapi.com/png/${data.countrycode.toLowerCase()}`;
            applyThemeBasedOnLocation(data.countrycode);
        });
}

function applyThemeBasedOnLocation(countryCode) {
    const container = document.querySelector('.container');
    if (countryCode === 'IT') { // Example: Italy
        container.style.backgroundColor = '#ffebcd';
        document.body.style.color = '#333';
    } else {
        container.style.backgroundColor = '#f4f4f4';
    }
}

// Toggle recipe details with smooth transition
function toggleRecipeDetails(recipeItem) {
    const details = recipeItem.querySelector('.recipe-details');
    if (details.style.maxHeight) {
        details.style.maxHeight = null; // Collapse
    } else {
        details.style.maxHeight = details.scrollHeight + "px"; // Expand smoothly
    }
}

// Function to fetch mock recipes and enable toggle functionality
function fetchRecipes() {
    const mockData = {
        results: [
            { id: 1, title: 'Spaghetti Carbonara', imgSrc: 'https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/0346a29a89ef229b1a0ff9697184f944/Derivates/cb5051204f4a4525c8b013c16418ae2904e737b7.jpg' },
            { id: 2, title: 'Caprese Salad', imgSrc: 'https://www.modernhoney.com/wp-content/uploads/2021/07/Caprese-Salad-1-scaled.jpg' },
            { id: 3, title: 'Chicken Tikka Masala', imgSrc: 'https://www.recipetineats.com/tachyon/2018/04/Chicken-Tikka-Masala_0.jpg?resize=1200%2C1680&zoom=0.5' },
            // More mock data as needed...
        ]
    };

    const recipeList = document.getElementById('recipe-list');
    recipeList.innerHTML = ''; // Clear previous recipes

    mockData.results.forEach(recipe => {
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
}

// Call fetchRecipes on page load
fetchRecipes();
