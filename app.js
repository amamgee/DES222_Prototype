const apiKey = '361e5a4d93f34759a79f3c93beb6c2e1'; // Replace with your Spoonacular API key

// Get user's current geolocation
navigator.geolocation.getCurrentPosition(function(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    
    // Display the user's location
    document.getElementById('latitude').textContent = latitude;
    document.getElementById('longitude').textContent = longitude;

    // Fetch recipes based on time of day
    const hours = new Date().getHours();
    let mealType = 'dinner'; // Default meal type
    if (hours < 12) mealType = 'breakfast';
    else if (hours >= 12 && hours < 17) mealType = 'lunch';

    fetchRecipes(mealType);
});

// Function to fetch recipes from Spoonacular API
function fetchRecipes(mealType) {
    fetch(`https://api.spoonacular.com/recipes/complexSearch?type=${mealType}&apiKey=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            const recipeList = document.getElementById('recipe-list');
            recipeList.innerHTML = ''; // Clear previous recipes
            data.results.forEach(recipe => {
                const listItem = document.createElement('li');
                listItem.textContent = recipe.title;
                recipeList.appendChild(listItem);
            });
        })
        .catch(error => console.error('Error fetching recipes:', error));
});

// Note: Device orientation event listener has been removed.
