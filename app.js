document.addEventListener('DOMContentLoaded', () => {
  const ipGeolocationUrl = 'https://ipinfo.io/77.32.78.146?token=773d706935dfe5';
  let page = 1;
  let location;

  setTimeout(() => {
    document.getElementById('splash-screen').style.display = 'none';
    document.getElementById('login-page').classList.remove('hidden');
  }, 2500);

  document.getElementById('explore-button').addEventListener('click', () => {
    fetch(ipGeolocationUrl)
      .then(response => response.json())
      .then(data => {
        location = data.city || 'Noosa, Australia';
        document.getElementById('user-location').textContent = location;
        document.getElementById('login-page').style.display = 'none';
        document.getElementById('main-content').classList.remove('hidden');
        fetchPhotosFromPexels(location, page);
      })
      .catch(error => {
        console.error('Error fetching IP location:', error);
        location = 'Noosa, Australia';
        document.getElementById('user-location').textContent = location;
        document.getElementById('login-page').style.display = 'none';
        document.getElementById('main-content').classList.remove('hidden');
        fetchPhotosFromPexels(location, page);
      });
  });

  document.getElementById('load-more-button').addEventListener('click', () => {
    page++;
    fetchPhotosFromPexels(location, page);
  });
});

function fetchPhotosFromPexels(query, page) {
  const apiKey = 'RE9OiIOFqVbNwm4KTxrIiRH7AJDgOar2Vgan24sSj8GK0ruHJfb4IMVk';
  const perPage = 50;
  const url = `https://api.pexels.com/v1/search?query=${query}&per_page=${perPage}&page=${page}`;

  fetch(url, { headers: { Authorization: apiKey } })
    .then(response => response.json())
    .then(data => {
      if (data.photos && data.photos.length > 0) {
        displayPhotos(data.photos);
        document.getElementById('load-more-button').classList.remove('hidden');
      }
    })
    .catch(error => console.error('Error fetching Pexels images:', error));
}

function displayPhotos(photos) {
  const sightseeingFeed = document.getElementById('sightseeing-feed');
  photos.forEach(photo => {
    const img = document.createElement('img');
    img.src = photo.src.medium;
    img.alt = photo.alt || 'Sightseeing Image';
    img.classList.add('sightseeing-image');
    sightseeingFeed.appendChild(img);
  });
}

function displayPhotos(photos) {
  const sightseeingFeed = document.getElementById('sightseeing-feed');
  photos.forEach(photo => {
    const img = document.createElement('img');
    img.src = photo.src.medium; // Use medium-sized images from Pexels
    img.alt = photo.alt || 'Sightseeing Image';
    img.classList.add('sightseeing-image');

    // Add click event to open modal with image details
    img.addEventListener('click', () => {
      showImageModal(photo);
    });

    sightseeingFeed.appendChild(img);
  });
}

// Function to show the modal with image details
function showImageModal(photo) {
  const modal = document.getElementById('image-modal');
  const modalImage = document.getElementById('modal-image');
  const photographerName = document.getElementById('photographer-name');
  const imageDescription = document.querySelector('.image-description');
  const directionsLink = document.getElementById('directions-link');

  // Set the image, description, and photographer info in the modal
  modalImage.src = photo.src.large;
  modalImage.alt = photo.alt || 'Sightseeing Image';
  photographerName.textContent = photo.photographer || 'Unknown Photographer';
  imageDescription.textContent = photo.alt || 'No description available.';

  // Extract keywords from the photo.alt (description) to use in Google Maps search
  const searchTerm = extractLocationKeywords(photo.alt);
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(searchTerm)}`;
  directionsLink.href = googleMapsUrl;
  directionsLink.classList.remove('hidden'); // Show the "Get Directions" link

  modal.classList.remove('hidden'); // Display the modal
}

// Helper function to extract keywords for location-based search
function extractLocationKeywords(description) {
  if (!description) {
    return "famous landmark"; // Fallback if no description is available
  }

  // Example approach: Define common keywords or fallback if needed
  const locationKeywords = [
    "Rome", "Paris", "Eiffel Tower", "Colosseum", "St. Peter's Basilica", "Amalfi Coast",
    // Sunshine Coast Australia locations
    "Noosa", "Mooloolaba", "Caloundra", "Glass House Mountains", "Hinterland", "Eumundi", 
    "Alexandra Headland", "Kings Beach", "Sunshine Beach", "Point Cartwright", "Mount Coolum", 
    "Coolum Beach", "Maroochydore", "Buderim", "Kondalilla Falls", "Mapleton Falls"
  ];
  
  const foundKeywords = locationKeywords.filter(keyword => description.includes(keyword));

  // Join found keywords or default to the entire description if no specific keyword is found
  return foundKeywords.length > 0 ? foundKeywords.join(", ") : description;
}



// Function to close the modal
function closeModal() {
  const modal = document.getElementById('image-modal');
  modal.classList.add('hidden');
}

// Attach event listener to the "X" button
document.addEventListener('DOMContentLoaded', () => {
  const closeModalButton = document.getElementById('close-modal-button');
  closeModalButton.addEventListener('click', closeModal);
});

document.addEventListener('DOMContentLoaded', function() {
  const likeButtons = document.querySelectorAll('.like-button');
  
  likeButtons.forEach(button => {
    button.addEventListener('click', function() {
      this.classList.toggle('liked'); // Toggle the 'liked' class to change the color
    });
  });
});
