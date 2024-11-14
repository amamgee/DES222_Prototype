// Splash Screen Logic
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

// Fetch User's Location and Recipes
navigator.geolocation.getCurrentPosition(
    (position) => {
        const { latitude, longitude } = position.coords;
        fetchRecipesByLocation(latitude, longitude);
    },
    () => {
        document.getElementById('location').textContent = 'Location access denied. Showing popular recipes.';
        fetchRecipesByLocation(); // Fetch generic recipes if location is unavailable
    }
);

// Fetch Recipes Based on Location
function fetchRecipesByLocation(latitude, longitude) {
    const recipeList = document.getElementById('recipe-list');
    recipeList.innerHTML = ''; // Clear previous recipes

    // Mock API response based on location (replace with actual API call)
    const mockRecipes = [
        { id: 1, title: 'Pasta Carbonara', imgSrc: 'https://example.com/pasta.jpg', details: 'Traditional Italian pasta with eggs and cheese.' },
        { id: 2, title: 'Sushi', imgSrc: 'https://example.com/sushi.jpg', details: 'Japanese rice dish with fish and vegetables.' },
        { id: 3, title: 'Tacos', imgSrc: 'https://example.com/tacos.jpg', details: 'Mexican tortillas filled with meat and vegetables.' }
    ];

    mockRecipes.forEach(recipe => {
        const recipeItem = document.createElement('div');
        recipeItem.classList.add('recipe-item');
        recipeItem.innerHTML = `
            <img src="${recipe.imgSrc}" alt="${recipe.title}">
            <h3>${recipe.title}</h3>
            <div class="recipe-details">${recipe.details}</div>
        `;

        // Toggle details visibility
        recipeItem.addEventListener('click', () => {
            const details = recipeItem.querySelector('.recipe-details');
            details.classList.toggle('open');
        });

        recipeList.appendChild(recipeItem);
    });

    // Display location
    document.getElementById('location').textContent = latitude && longitude
        ? `Recipes near your location: ${latitude.toFixed(2)}, ${longitude.toFixed(2)}`
        : 'Showing popular recipes worldwide';
}
