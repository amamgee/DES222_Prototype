const apiKey = '361e5a4d93f34759a79f3c93beb6c2e1'; // Replace with your Spoonacular API key

// Mock data to simulate the API response
const mockData = {
    results: [
        {
            id: 1,
            title: 'Spaghetti Carbonara',
            extendedIngredients: [
                { original: 'spaghetti' },
                { original: 'egg' },
                { original: 'Parmesan cheese' },
                { original: 'pancetta' },
                { original: 'black pepper' },
            ],
            instructions: 'Cook spaghetti. Fry pancetta. Mix with eggs and cheese.'
        },
        {
            id: 2,
            title: 'Caprese Salad',
            extendedIngredients: [
                { original: 'mozzarella cheese' },
                { original: 'tomatoes' },
                { original: 'fresh basil' },
                { original: 'olive oil' },
                { original: 'balsamic vinegar' },
            ],
            instructions: 'Layer mozzarella, tomatoes, and basil. Drizzle with olive oil and balsamic vinegar.'
        },
        {
            id: 3,
            title: 'Chicken Tikka Masala',
            extendedIngredients: [
                { original: 'chicken' },
                { original: 'yogurt' },
                { original: 'garam masala' },
                { original: 'tomato sauce' },
                { original: 'cream' },
            ],
            instructions: 'Marinate chicken, then cook with spices and sauce.'
        },
        {
            id: 4,
            title: 'Tacos',
            extendedIngredients: [
                { original: 'taco shells' },
                { original: 'ground beef' },
                { original: 'cheese' },
                { original: 'lettuce' },
                { original: 'salsa' },
            ],
            instructions: 'Cook beef, fill taco shells, and add toppings.'
        },
        {
            id: 5,
            title: 'Margarita Pizza',
            extendedIngredients: [
                { original: 'pizza dough' },
                { original: 'tomato sauce' },
                { original: 'mozzarella cheese' },
                { original: 'basil' },
                { original: 'olive oil' },
            ],
            instructions: 'Spread sauce on dough, add cheese and basil, then bake.'
        },
        {
            id: 6,
            title: 'Chocolate Cake',
            extendedIngredients: [
                { original: 'flour' },
                { original: 'sugar' },
                { original: 'cocoa powder' },
                { original: 'eggs' },
                { original: 'milk' },
                { original: 'butter' },
            ],
            instructions: 'Mix ingredients and bake in a cake pan.'
        }
    ]
};

// Get user's current geolocation
navigator.geolocation.getCurrentPosition(function(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    // Display the user's location (optional)
    document.getElementById('latitude').textContent = latitude;
    document.getElementById('longitude').textContent = longitude;

    // Fetch recipes based on time of day and location
    const hours = new Date().getHours();
    let mealType = 'dinner'; // Default meal type
    if (hours < 12) mealType = 'breakfast';
    else if (hours >= 12 && hours < 17) mealType = 'lunch';

    // Use mock data instead of API call
    fetchRecipes(mealType, latitude, longitude);
});

// Function to fetch recipes from Spoonacular API or use mock data
function fetchRecipes(mealType, latitude, longitude) {
    console.log(`Fetching recipes for meal type: ${mealType}`); // Debug log

    // Use mock data for testing instead of an API call
    const data = mockData; // Replace this with the API fetch when you're ready

    const recipeList = document.getElementById('recipe-list');
    recipeList.innerHTML = ''; // Clear previous recipes

    // Check if results are present
    if (data.results && data.results.length > 0) {
        data.results.forEach(recipe => {
            const recipeItem = document.createElement('div');
            recipeItem.className = 'recipe-item';
            recipeItem.innerHTML = `
                <img src="https://via.placeholder.com/150" alt="${recipe.title}"> <!-- Placeholder for recipe image -->
                <h3>${recipe.title}</h3>
            `;
            recipeItem.onclick = () => fetchRecipeDetails(recipe.id); // Call to fetch details on click
            recipeList.appendChild(recipeItem);
        });
    } else {
        recipeList.innerHTML = '<div>No recipes found.</div>'; // Handle no results
    }
}

// Function to fetch detailed recipe information
function fetchRecipeDetails(recipeId) {
    // Find the recipe in mock data by ID
    const recipe = mockData.results.find(r => r.id === recipeId);
    if (recipe) {
        displayRecipeDetails(recipe);
    } else {
        console.error('Recipe not found:', recipeId);
    }
}

// Function to display recipe details when a recipe is selected
function displayRecipeDetails(recipe) {
    const detailsSection = document.getElementById('recipe-details');
    detailsSection.innerHTML = `
        <h3>${recipe.title}</h3>
        <h4>Ingredients:</h4>
        <ul>
            ${recipe.extendedIngredients.map(ingredient => `<li>${ingredient.original}</li>`).join('')}
        </ul>
        <h4>Instructions:</h4>
        <p>${recipe.instructions || 'No instructions available.'}</p>
    `;
    detailsSection.style.display = 'block'; // Show details section
}

// Basic CSS for styling
const style = document.createElement('style');
style.textContent = `
    body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        color: #333;
        padding: 20px;
        margin: 0; /* Remove default margin */
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .container {
        max-width: 600px; /* Adjusted max width for mobile */
        margin: 0 auto;
        background: white;
        padding: 20px;
        border-radius: 5px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    h2 {
        text-align: center;
    }
    .recipe-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); /* Responsive grid */
        gap: 10px; /* Reduced gap for mobile */
    }
    .recipe-item {
        background: #e9e9e9;
        border-radius: 8px;
        padding: 10px;
        cursor: pointer;
        transition: transform 0.2s;
        text-align: center; /* Center text */
    }
    .recipe-item:hover {
        transform: scale(1.05);
    }
    .recipe-item img {
        width: 100%; /* Responsive image */
        height: auto; /* Maintain aspect ratio */
        border-radius: 8px;
    }
    #recipe-details {
        margin-top: 20px;
        padding: 10px;
        background: #f9f9f9;
        border: 1px solid #ddd;
        border-radius: 3px;
        display: none; /* Hide details initially */
    }
`;
document.head.appendChild(style);
