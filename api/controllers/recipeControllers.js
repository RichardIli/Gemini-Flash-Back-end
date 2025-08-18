// controllers/recipeController.js
const { model } = require('../config/gemini.js');

const exampleOutput = `[
    {
        "foodCategory": "Food category (e.g., salad, soup, main course)",
        "foodName": "Recipe Name",
        "ingredients": ["ingredient1", "ingredient2", "..."],
        "preparationTime": "30 minutes",
        "difficulty": "easy",
        "process": "Step 1: ...\n Step 2: ..."
    }
    // ...more recipes
]`;

// Helper to call Gemini API and parse JSON
async function getRecipesFromGemini(prompt) {
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    try {
        return JSON.parse(responseText);
    } catch (err) {
        throw new SyntaxError('Failed to parse Gemini JSON response: ' + err.message);
    }
}

exports.generateRecipe = async (req, res) => {
    const { ingredients, category } = req.body;
    if (!ingredients) {
        return res.status(400).json({ error: 'Ingredients are required in the request body.' });
    }
    const foodCategory = category ?? 'food or meal';
    const prompt = `I want to make a ${foodCategory} using these ingredients: ${ingredients}.
        I want multiple options. Please add some common, easy-to-acquire ingredients.
        Rate preparation as easy, medium, or hard.
        Output JSON: "foodCategory", "foodName", "ingredients", "preparationTime", "difficulty", "process".
        ${exampleOutput}`;
    try {
        const recipes = await getRecipesFromGemini(prompt);
        res.status(200).json(recipes);
    } catch (error) {
        console.error('Gemini API or JSON parsing error:', error);
        res.status(500).json({ error: error.message });
    }
};

exports.generateDailyRecipe = async (req, res) => {
    const prompt = `I want to make a food or meal.
        Give at least 5 options.
        Rate preparation as easy, medium, or hard.
        Output JSON: "foodCategory", "foodName", "ingredients", "preparationTime", "difficulty", "process".
        ${exampleOutput}`;
    try {
        const recipes = await getRecipesFromGemini(prompt);
        res.status(200).json(recipes);
    } catch (error) {
        console.error('Gemini API or JSON parsing error:', error);
        res.status(500).json({ error: error.message });
    }
};

exports.generateRecipeByCategory = async (req, res) => {
    const { foodCategory } = req.body;
    if (!foodCategory) {
        return res.status(400).json({ error: 'Category is required in the request body.' });
    }
    const prompt = `I want to make a ${foodCategory}.
        Give at least 5 options.
        Rate preparation as easy, medium, or hard.
        Output JSON: "foodCategory", "foodName", "ingredients", "preparationTime", "difficulty", "process".
        ${exampleOutput}`;
    try {
        const recipes = await getRecipesFromGemini(prompt);
        res.status(200).json(recipes);
    } catch (error) {
        console.error('Gemini API or JSON parsing error:', error);
        res.status(500).json({ error: error.message });
    }
};

exports.generateRecipeOfThisFood = async (req, res) => {
    const { foodName } = req.body;
    if (!foodName) {
        return res.status(400).json({ error: 'foodName is required in the request body.' });
    }
    const prompt = `I want to make a ${foodName}.
        Give at least 5 options for how to cook it.
        Rate preparation as easy, medium, or hard.
        Output JSON: "foodCategory", "foodName", "ingredients", "preparationTime", "difficulty", "process".
        ${exampleOutput}`;
    try {
        const recipes = await getRecipesFromGemini(prompt);
        res.status(200).json(recipes);
    } catch (error) {
        console.error('Gemini API or JSON parsing error:', error);
        res.status(500).json({ error: error.message });
    }
};