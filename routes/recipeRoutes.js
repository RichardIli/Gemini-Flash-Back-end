// routes/recipeRoutes.js
const express = require('express');
const router = express.Router();
const { generateRecipe } = require('../controllers/recipeControllers.js');

// Define the route for recipe generation
router.post('/generate', generateRecipe);

module.exports = router;