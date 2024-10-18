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
    l
