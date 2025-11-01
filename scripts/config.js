// config.js
//
// Configuration file for global constants and variables
// Contains API URLs and application-wide settings
//


// URL of the REST API for genres
const genresUrl = "http://localhost:8000/api/v1/genres/";

// URL of the REST API for movie titles
const titlesUrl = "http://localhost:8000/api/v1/titles/";

// Global variable to store the currently selected genre
let selectedGenre = "";

// initialization of the 2 genres presented in the main page
category1 = "Mystery";
category2 = "Comedie";