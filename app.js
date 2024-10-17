const apiKey = '361e5a4d93f34759a79f3c93beb6c2e1'; // Replace with your Spoonacular API key

// Get user's current geolocation
navigator.geolocation.getCurrentPosition(function(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    
    // Display the user's location
    document.getElementById('latitude').textContent = latitude;
    document.getElementById('longitude').textContent = longitude;

    // Fetch recipes based on time of day and location
    const hours = new Date().getHours();
    let mealType = 'dinner'; // Default meal type
    if (hours < 12) mealType = 'breakfast';
    else if (hours >= 12 && hours < 17) mealType = 'lunch';

    // Fetch recipes with latitude and longitude
    fetchRecipes(mealType, latitude, longitude);
});

// Function to fetch recipes from Spoonacular API
function fetchRecipes(mealType, latitude, longitude) {
    fetch(`https://api.spoonacular.com/recipes/complexSearch?type=${mealType}&apiKey=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            const recipeList = document.getElementById('recipe-list');
            recipeList.innerHTML = ''; // Clear previous recipes
            if (data.results.length > 0) {
                data.results.forEach(recipe => {
                    const listItem = document.createElement('li');
                    listItem.textContent = recipe.title;
                    listItem.onclick = () => fetchRecipeDetails(recipe.id); // Call to fetch details on click
                    recipeList.appendChild(listItem);
                });
            } else {
                recipeList.innerHTML = '<li>No recipes found.</li>'; // Handle no results
            }
        })
        .catch(error => console.error('Error fetching recipes:', error));
}

// Function to fetch detailed recipe information
function fetchRecipeDetails(recipeId) {
    fetch(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`)
        .then(response => response.json())
        .then(recipe => {
            displayRecipeDetails(recipe);
        })
        .catch(error => console.error('Error fetching recipe details:', error));
}

// Function to display recipe details when a recipe is selected
function displayRecipeDetails(recipe) {
    const detailsSection = document.getElementById('recipe-details');
    detailsSection.innerHTML = `
        <h3>${recipe.title}</h3>
        <p><strong>ID:</strong> ${recipe.id}</p>
        <h4>Ingredients:</h4>
        <ul>
            ${recipe.extendedIngredients.map(ingredient => `<li>${ingredient.original}</li>`).join('')}
        </ul>
        <h4>Instructions:</h4>
        <p>${recipe.instructions || 'No instructions available.'}</p>
    `;
}

// Optionally, remove the dynamic HTML generation if you have it statically in your HTML file

// Basic CSS for styling
const style = document.createElement('style');
style.textContent = `
    body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        color: #333;
        padding: 20px;
    }
    .container {
        max-width: 600px;
        margin: 0 auto;
        background: white;
        padding: 20px;
        border-radius: 5px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    h2 {
        text-align: center;
    }
    ul {
        list-style: none;
        padding: 0;
    }
    li {
        margin: 10px 0;
        padding: 10px;
        background: #e9e9e9;
        border-radius: 3px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    button {
        padding: 5px 10px;
        background: #007bff;
        border: none;
        color: white;
        border-radius: 3px;
        cursor: pointer;
    }
    button:hover {
        background: #0056b3;
    }
    h4 {
        margin-top: 20px;
    }
    #recipe-details {
        margin-top: 20px;
        padding: 10px;
        background: #f9f9f9;
        border: 1px solid #ddd;
        border-radius: 3px;
    }
`;
document.head.appendChild(style);
