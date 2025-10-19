// routes/recipeRoutes.js
const express = require('express');
const router = express.Router();
const {
    generateRecipe,
    generateDailyRecipe,
    generateRecipeByCategory,
    generateRecipeOfThisFood,
    // generateRecipeItemImage
} = require('../controllers/recipeControllers.js');
const { retreiveImage } = require('../controllers/stockImageFetcher.js');
const { generateBonsaiList } = require('../controllers/bonsaiCntroller.js');

// Generate recipes based on ingredients and optional category
router.post('/generateRecipe', generateRecipe);

// Generate daily recipe suggestions
router.post('/generateDailyRecipe', generateDailyRecipe);

// Generate recipes by food category
router.post('/generateRecipeByCategory', generateRecipeByCategory);

// Generate recipes for a specific food name
router.post('/generateRecipeOfThisFood', generateRecipeOfThisFood);

// Generate bonsai items
router.get('/bonsaiList', generateBonsaiList);

// this route is currently not used or available
// Generate an image of a food item with ingredients
// router.post('/generateRecipeItemImage', generateRecipeItemImage);

// Route to retrieve stock images based on item name
router.post('/retreiveImage', retreiveImage);


module.exports = router;