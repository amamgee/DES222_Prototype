document.addEventListener('DOMContentLoaded', () => {
  const ipGeolocationUrl = 'https://ipinfo.io/json?token=YOUR_IPINFO_API_KEY'; // Replace with your IPinfo API token
  let page = 1; // Start at the first page
  let location = 'Noosa, Australia'; // Default location for testing

  // Hide splash screen and show main content after a short delay
  setTimeout(() => {
    document.getElementById('splash-screen').style.display = 'none';
    document.getElementById('main-content').classList.remove('hidden');
  }, 2500);

  // Fetch user's location based on IP
  fetch(ipGeolocationUrl)
    .then(response => response.json())
    .then(data => {
      location = data.city || location; // Use detected city or fallback to hardcoded location
      console.log(`Detected location: ${location}`);

      // Load initial photos
      fetchPhotosFromPexels(location, page);

      // Set up infinite scroll listener on window
      window.addEventListener('scroll', handleScroll);
    })
    .catch(error => {
      console.error('Error fetching IP location:', error);
      console.log(`Falling back to hardcoded location: ${location}`);
      fetchPhotosFromPexels(location, page);
      window.addEventListener('scroll', handleScroll);
    });
});

function fetchPhotosFromPexels(query, page) {
  const apiKey = 'RE9OiIOFqVbNwm4KTxrIiRH7AJDgOar2Vgan24sSj8GK0ruHJfb4IMVk';
  const perPage = 30; // Fetch 30 images per request
  const url = `https://api.pexels.com/v1/search?query=${query}&per_page=${perPage}&page=${page}`;

  console.log(`Fetching photos from Pexels for query: "${query}" - Page: ${page}, Per Page: ${perPage}`);
  console.log(`API URL: ${url}`);

  fetch(url, {
    headers: { Authorization: apiKey }
  })
    .then(response => {
      console.log('Response status:', response.status); // Check the HTTP status
      return response.json();
    })
    .then(data => {
      console.log('Pexels API response:', data); // Log the entire response
      if (data.photos && data.photos.length > 0) {
        displayPhotos(data.photos);
      } else {
        console.warn('No photos returned from Pexels API for this query.');
      }
    })
    .catch(error => console.error('Error fetching Pexels images:', error));
}
