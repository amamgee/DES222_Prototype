// Configuration
const config = {
  apiKey: '361e5a4d93f34759a79f3c93beb6c2e1', // Move this to environment variables in production
  apiBaseUrl: 'https://api.spoonacular.com/recipes'
};

// State management
let state = {
  recipes: [],
  currentRecipe: null,
  location: null,
  loading: true,
  error: null
};

// DOM Elements
const elements = {
  splashScreen: document.getElementById('splash-screen'),
  recipeList: document.getElementById('recipe-list'),
  recipeModal: document.getElementById('recipe-modal'),
  recipeDetails: document.getElementById('recipe-details'),
  loadingState: document.getElementById('loading'),
  errorMessage: document.getElementById('error-message'),
  locationText: document.getElementById('location-text'),
  closeButton: document.querySelector('.close-button')
};

// Initialize app
document.addEventListener('DOMContentLoaded', initializeApp);

async function initializeApp() {
  try {
      await getUserLocation();
      await loadInitialRecipes();
      hideSplashScreen();
  } catch (error) {
      showError('Failed to initialize app: ' + error.message);
  }
}

// Location handling
async function getUserLocation() {
  return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
          reject(new Error('Geolocation is not supported'));
          return;
      }

      navigator.geolocation.getCurrentPosition(
          position => {
              state.location = {
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude
              };
              elements.locationText.textContent = `${position.coords.latitude.toFixed(2)}, ${position.coords.longitude.toFixed(2)}`;
              resolve(state.location);
          },
          error => {
              reject(new Error('Unable to get location: ' + error.message));
          }
      );
  });
}

// Recipe loading
async function loadInitialRecipes() {
  const mealType = getMealTypeByTime();
  state.loading = true;
  updateUI();

  try {
      // Using mock data for now
      state.recipes = mockData.results;
      renderRecipes();
  } catch (error) {
      showError('Failed to load recipes: ' + error.message);
  } finally {
      state.loading = false;
      updateUI();
  }
}

// UI Updates
function updateUI() {
  elements.loadingState.style.display = state.loading ? 'block' : 'none';
  elements.errorMessage.style.display = state.error ? 'block' : 'none';
  if (state.error) {
      elements.errorMessage.textContent = state.error;
  }
}

function renderRecipes() {
  elements.recipeList.innerHTML = state.recipes.map(recipe => `
      <div class="recipe-item" onclick="showRecipeDetails(${recipe.id})">
          <img src="${recipe.imgSrc}" alt="${recipe.title}">
          <div class="recipe-item-content">
              <h3>${recipe.title}</h3>
              <div class="recipe-meta">
                  <span><i class="far fa-clock"></i> ${recipe.cookingTime}</span>
                  <span><i class="fas fa-user-friends"></i> ${recipe.servings} servings</span>
              </div>
          </div>
      </div>
  `).join('');
}

function showRecipeDetails(recipeId) {
  const recipe = state.recipes.find(r => r.id === recipeId);
  if (!recipe) return;

  elements.recipeDetails.innerHTML = `
      <img src="${recipe.imgSrc}" alt="${recipe.title}">
      <h3>${recipe.title}</h3>
      
      <div class="recipe-meta">
          <span><i class="far fa-clock"></i> ${recipe.cookingTime}</span>
          <span><i class="fas fa-user-friends"></i> ${recipe.servings} servings</span>
      </div>

      <div class="ingredients-list">
          <h4>Ingredients</h4>
          <ul>${recipe.ingredients.map(ing => `<li>${ing}</li>`).join('')}</ul>
      </div>

      <div class="steps-list">
          <h4>Instructions</h4>
          <ol>${recipe.steps.map(step => `<li>${step}</li>`).join('')}</ol>
      </div>
  `;

  elements.recipeModal.style.display = 'block';
}

// Utility functions
function getMealTypeByTime() {
  const hours = new Date().getHours();
  if (hours < 12) return 'breakfast';
  if (hours < 17) return 'lunch';
  return 'dinner';
}

function hideSplashScreen() {
  elements.splashScreen.style.opacity = '0';
  setTimeout(() => {
      elements.splashScreen.style.display = 'none';
  }, 500);
}

function showError(message) {
  state.error = message;
  updateUI();
}

// Event Listeners
elements.closeButton.addEventListener('click', () => {
  elements.recipeModal.style.display = 'none';
});

window.addEventListener('click', (event) => {
  if (event.target === elements.recipeModal) {
      elements.recipeModal.style.display = 'none';
  }
});

// Mock data (move to separate file in production)
const mockData = {
  results: [/* Your existing mock data */]
};