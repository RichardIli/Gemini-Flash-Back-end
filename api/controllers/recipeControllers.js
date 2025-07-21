// controllers/recipeController.js
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize the Gemini API client
const api_Key = process.env.API_KEY;
if (!api_Key) {
    console.error('API_KEY is not defined in environment variables.');
    process.exit(1);
}
const genAI = new GoogleGenerativeAI(api_Key);

/**
 * Controller function to generate a recipe based on ingredients.
 * @param {express.Request} req The Express request object.
 * @param {express.Response} res The Express response object.
 */
exports.generateRecipe = async (req, res) => {
    const { ingredients, category } = req.body;

    // Basic validation
    if (!ingredients) {
        return res.status(400).json({ error: 'Ingredients are required in the request body.' });
    }

    try {
        const foodCategory = category ?? 'food or meal';

        // the bloc should fetch this "foodCategory","name", "preparationTime", "difficulty" and "process" from a repository

        const prompt = `I want to make a ${foodCategory} using these ingredients that I have. ${ingredients}\n
        I want a multiple options.
        Please add some common ingredients that can be easy to acquire.\n
        Give it the preparation level from easy, medium or hard level based on preparation and the ingredients.
        the ouput that I want is a JSON object with the following: "foodCategory", "foodName", "ingredients", "preparationTime", "difficulty" and "process".
        [
            {
                "foodCategory": "Food category",
                "foodName": "Recipe Name",
                "ingredients": ["ingredient1", "ingredient2", ...],
                "preparationTime": "30 minutes",
                "difficulty": "easy",
                "process": "Step 1: ..., Step 2: ..."
            },
            {
                "foodCategory": "Food category",
                "foodName": "Recipe Name",
                "ingredients": ["ingredient1", "ingredient2", ...],
                "preparationTime": "30 minutes",
                "difficulty": "easy",
                "process": "Step 1: ..., Step 2: ..."
            },
            and so on...
        ]`;

        const model = genAI.getGenerativeModel({
            model: 'gemini-1.5-flash',
            generationConfig: {
                responseMimeType: "application/json",
            },
        });

        const result = await model.generateContent(prompt);
        const responseText = result.response.text();
        const parsedJson = JSON.parse(responseText);

        res.status(200).json(parsedJson);

    } catch (error) {
        console.error('Gemini API or JSON parsing error:', error);
        if (error instanceof SyntaxError) {
            return res.status(500).json({ error: 'Failed to parse JSON response from Gemini. It may have returned a non-JSON output.', details: error.message });
        }
        res.status(500).json({ error: 'Internal server error occurred.', details: error.message });
    }
};