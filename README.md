# Food Recipes Website

A modern, responsive web application designed for browsing, searching, and managing culinary recipes. This project provides a comprehensive interface for users to discover new dishes, filter them by category, and maintain a personal collection of favorites.

## Project Description

The Food Recipes Website is a static frontend application that demonstrates the use of vanilla web technologies to create a dynamic user experience. It features a centralized recipe database stored in JSON format, a custom-built authentication system using browser local storage, and a responsive design that supports both light and dark themes.

## Features

*   **Recipe Discovery:** Browse a diverse collection of recipes with high-quality images and detailed descriptions.
*   **Dynamic Filtering:** Filter recipes by tags (e.g., breakfast, lunch, dinner, vegetarian) to quickly find specific meal types.
*   **Search Functionality:** Real-time search allows users to find recipes by name or ingredients.
*   **User Accounts:** Local storage-based registration and login system for a personalized experience.
*   **Favorites System:** Authenticated users can save their favorite recipes for quick access later.
*   **Responsive Design:** Fully optimized for various screen sizes, from mobile devices to desktop monitors.
*   **Theme Support:** Persistent light and dark mode selection.
*   **Modular Architecture:** Dynamic injection of common components like navigation bars and footers to ensure maintainability.

## Technologies Used

*   **HTML5:** Semantic structure for all web pages.
*   **CSS3:** Custom styling with modular files and CSS variables for theming.
*   **JavaScript (ES6+):** Vanilla JavaScript for all application logic, DOM manipulation, and data fetching.
*   **JSON:** Local data storage for recipe information and recommendations.
*   **Local Storage:** Client-side persistence for user data, favorites, and theme preferences.

## Installation and Local Setup

Since this is a static project, no complex installation or build process is required. To run the project locally:

1.  Clone or download the repository to your local machine.
2.  Navigate to the project root directory.
3.  Open `index.html` in a web browser.

**Note:** For the best experience and to avoid potential CORS (Cross-Origin Resource Sharing) issues when fetching local JSON files, it is recommended to serve the project using a local development server, such as the "Live Server" extension in Visual Studio Code or Python's built-in HTTP server.

Example using Python 3:
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000` in your browser.

## Directory Structure

*   `css/`: Contains page-specific and global stylesheets.
*   `data/`: Stores the JSON data files for recipes and recommendations.
*   `Images/`: Contains all graphical assets, including recipe photos and icons.
*   `js/`: Contains the JavaScript logic for the application's functionality.
*   `*.html`: Root directory contains the main HTML files for each page.

## License

This project is licensed under the MIT License. See the `LICENSE.txt` file for details.
