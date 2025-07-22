// routes/recipeRoutes.js
const express = require('express');
const router = express.Router();
const { generateRecipe, generateDailyRecipe } = require('../controllers/recipeControllers.js');

// Define the route for recipe generation
router.post('/generateRecipe', generateRecipe);

// Define the route for daily recipe generation
router.post('/generateDailyRecipe', generateDailyRecipe);

module.exports = router;