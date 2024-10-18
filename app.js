const apiKey = '361e5a4d93f34759a79f3c93beb6c2e1'; // Replace with your Spoonacular API key

// Mock data to simulate the API response
const mockData = {
    results: [
        { id: 1, title: 'Spaghetti Carbonara', imgSrc: 'https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/0346a29a89ef229b1a0ff9697184f944/Derivates/cb5051204f4a4525c8b013c16418ae2904e737b7.jpg', 
          ingredients: ['200g spaghetti', '100g pancetta', '50g pecorino cheese', '2 eggs', 'Salt', 'Black pepper'], 
          steps: ['Boil spaghetti.', 'Cook pancetta until crisp.', 'Mix eggs and cheese in a bowl.', 'Combine everything and serve.'], 
          cookingTime: '20 minutes', servings: 2 
        },
        { id: 2, title: 'Caprese Salad', imgSrc: 'https://www.modernhoney.com/wp-content/uploads/2021/07/Caprese-Salad-1-scaled.jpg', 
          ingredients: ['3 ripe tomatoes', '200g mozzarella cheese', 'Fresh basil', 'Olive oil', 'Balsamic vinegar', 'Salt'], 
          steps: ['Slice tomatoes and mozzarella.', 'Layer with basil leaves.', 'Drizzle with olive oil and balsamic.'], 
          cookingTime: '10 minutes', servings: 4 
        },
        { id: 3, title: 'Chicken Tikka Masala', imgSrc: 'https://www.recipetineats.com/tachyon/2018/04/Chicken-Tikka-Masala_0.jpg?resize=1200%2C1680&zoom=0.5', 
          ingredients: ['500g chicken breast', '200g yogurt', '2 tbsp tikka masala paste', '400g tomatoes', 'Onion', 'Coriander'], 
          steps: ['Marinate chicken in yogurt and spices.', 'Cook onion and add marinated chicken.', 'Pour in tomatoes and simmer.'], 
          cookingTime: '40 minutes', servings: 4 
        },
        { id: 4, title: 'Tacos', imgSrc: 'https://feelgoodfoodie.net/wp-content/uploads/2017/04/Ground-Beef-Tacos-9.jpg', 
          ingredients: ['500g ground beef', '8 taco shells', 'Lettuce', 'Tomato', 'Cheese', 'Sour cream'], 
          steps: ['Brown beef in a pan.', 'Fill taco shells with beef and toppings.'], 
          cookingTime: '30 minutes', servings: 4 
        },
        { id: 5, title: 'Margarita Pizza', imgSrc: 'https://cdn.loveandlemons.com/wp-content/uploads/2023/07/margherita-pizza-recipe.jpg', 
          ingredients: ['250g pizza dough', '200g mozzarella', 'Fresh basil', 'Olive oil', 'Tomato sauce'], 
          steps: ['Preheat oven to 250°C.', 'Roll out dough and add sauce and toppings.', 'Bake for 10-15 minutes.'], 
          cookingTime: '30 minutes', servings: 2 
        },
        { id: 6, title: 'Beef Stir Fry', imgSrc: 'https://www.tasteofhome.com/wp-content/uploads/2021/01/Beef-Stir-Fry_EXPS_HCAZ19_241651_B11_13_1b.jpg', 
          ingredients: ['500g beef strips', '1 bell pepper', '1 onion', 'Soy sauce', 'Garlic', 'Ginger'], 
          steps: ['Heat oil in a pan.', 'Add beef and cook until browned.', 'Add vegetables and sauce, stir-fry for 5 minutes.'], 
          cookingTime: '20 minutes', servings: 4 
        },
        { id: 7, title: 'Vegetable Curry', imgSrc: 'https://www.indianhealthyrecipes.com/wp-content/uploads/2021/09/vegetable-curry.jpg', 
          ingredients: ['2 cups mixed vegetables', '1 onion', '2 tomatoes', 'Coconut milk', 'Curry powder'], 
          steps: ['Sauté onion in a pot.', 'Add tomatoes and vegetables, cook for 5 minutes.', 'Pour in coconut milk and curry powder, simmer.'], 
          cookingTime: '30 minutes', servings: 4 
        },
        { id: 8, title: 'Pancakes', imgSrc: 'https://sallysbakingaddiction.com/wp-content/uploads/2023/06/vanilla-pancakes-recipe-1-1.jpg', 
          ingredients: ['1 cup flour', '2 tbsp sugar', '1 tsp baking powder', '1 egg', '1 cup milk'], 
          steps: ['Mix dry ingredients.', 'Add egg and milk, whisk until smooth.', 'Pour batter onto a heated griddle and cook until golden.'], 
          cookingTime: '15 minutes', servings: 2 
        },
        { id: 9, title: 'Grilled Salmon', imgSrc: 'https://www.simplyrecipes.com/thmb/mYco4KOTK83i8EtmYlGG0zxfM4E=/2120x1413/filters:no_upscale()/Simply-Recipes-Grilled-Salmon-LEAD-01-25d82efb1aa745d59c2cb99c5e5ed215.jpg', 
          ingredients: ['4 salmon fillets', 'Lemon', 'Garlic', 'Olive oil', 'Salt', 'Pepper'], 
          steps: ['Marinate salmon in olive oil, lemon juice, and garlic.', 'Grill for 5-7 minutes on each side.'], 
          cookingTime: '15 minutes', servings: 4 
        },
        { id: 10, title: 'Chocolate Chip Cookies', imgSrc: 'https://www.seriouseats.com/thmb/HcNEfNa8zOqkXxP1cRgNhPtxvN0=/1500x0/filters:no_upscale%28noswap%29/serious-eats-baked-chocolate-chip-cookies-hero-1c24a16f78cc415fb9c4cbac7a6c10a8.jpg', 
          ingredients: ['1 cup butter', '1 cup sugar', '2 cups flour', '1 cup chocolate chips', '1 egg'], 
          steps: ['Cream butter and sugar.', 'Add egg and mix.', 'Fold in flour and chocolate chips.', 'Scoop onto baking sheet and bake at 180°C for 10-12 minutes.'], 
          cookingTime: '30 minutes', servings: 12 
        },
        { id: 11, title: 'Greek Salad', imgSrc: 'https://www.dietdoctor.com/wp-content/uploads/2021/04/greek-salad-hero-scaled.jpg', 
          ingredients: ['2 cucumbers', '4 tomatoes', '1 onion', '200g feta cheese', 'Olive oil', 'Olives'], 
          steps: ['Chop vegetables and feta.', 'Mix in a bowl and drizzle with olive oil.'], 
          cookingTime: '10 minutes', servings: 4 
        },
        { id: 12, title: 'Shrimp Scampi', imgSrc: 'https://www.cookingclassy.com/wp-content/uploads/2023/01/shrimp-scampi-1-1200.jpg', 
          ingredients: ['500g shrimp', '4 garlic cloves', '1 lemon', 'Butter', 'Parsley', 'Pasta'], 
          steps: ['Cook pasta.', 'Sauté garlic in butter.', 'Add shrimp and cook until pink.', 'Toss with pasta and lemon juice.'], 
          cookingTime: '20 minutes', servings: 4 
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
