# SnapGram Prototype

SnapGram is a responsive web application designed to help users discover Instagram-worthy sightseeing spots nearby. The application leverages the Pexels API for stunning photos and integrates user-friendly features like infinite scrolling, location-based suggestions, and an interactive modal for additional photo details.

## Features

- **Responsive Design**: Optimized for mobile and desktop views.
- **Location Detection**: Automatically identifies the user's location to suggest nearby spots.
- **Dynamic Photo Feed**: Displays photos from the Pexels API in a Pinterest-style layout with infinite scrolling.
- **Photo Modal**: Interactive modal showing detailed photo information and a link to get directions via Google Maps.
- **Like Feature**: Allows users to like photos with a heart icon that toggles when clicked.

## Technologies Used

- **HTML**: Structure of the web app.
- **CSS**: Styling for a clean, responsive design.
- **JavaScript**: Core functionality and API integration.
- **Pexels API**: Source for dynamic and high-quality photo content.
- **GitHub Secrets**: Securely manages the API key.

## Installation and Setup

1. Clone this repository to your local machine:
   ```bash
   git clone https://github.com/your-username/SnapGram.git
   ```
2. Navigate to the project directory:
   ```bash
   cd SnapGram
   ```
3. Install dependencies (if applicable):
   ```bash
   npm install
   ```
4. Set up your environment:
   - Create a `.env` file in the root directory.
   - Add your Pexels API key:
     ```plaintext
     PEXELS_API_KEY=your_api_key_here
     ```
5. Start the development server:
   ```bash
   npm start
   ```

## Usage

- **Explore Nearby Spots**: Upon launching the app, SnapGram automatically fetches photos based on your location.
- **Like Photos**: Click the heart icon on any photo to like it.
- **View Details**: Click a photo to open a modal with additional information and a "Get Directions" link.

## Screenshots

![Splash Screen](screenshot-splash.png)
![Photo Feed](screenshot-feed.png)
![Photo Modal](screenshot-modal.png)

## Deployment

SnapGram is deployed at [SnapGram Prototype](https://amamgee.github.io/DES222_Prototype/). You can scan the QR code below to access the live site:

![QR Code](frame.png)

## Future Enhancements

- **User Accounts**: Allow users to save favourites and create collections.
- **User-Generated Content**: Enable users to upload and share their own photos.
- **Advanced Filters**: Add sorting and filtering options for more personalized exploration.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgements

- **Pexels API**: For providing access to a library of high-quality photos.
- **GitHub Secrets**: For managing sensitive data securely.
