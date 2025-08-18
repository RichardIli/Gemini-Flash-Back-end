const model = require('../config/gemini.js');

// Helper to call Gemini API and parse JSON
async function getRecipesFromGemini(prompt) {
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    try {
        // Parse the JSON response from Gemini
        return JSON.parse(responseText);
    } catch (err) {
        throw new SyntaxError('Failed to parse Gemini JSON response: ' + err.message);
    }
}

const exampleOutput = `[
    {
         itemId: <generate random number>,
         image: <generated image>,
         name: <bonsai name>,
         description: <description of the bonsai>,
         startingBid: <random start bidding amount>,
         uploadDate: <date>,
         uploader: <uploader name>,
         currentBid: <current bid amount>,
         biddingEnd: <date>
    },
    // ...more recipes
]`;

exports.generateBonsaiList = async (req, res) => {
    try {
        const bonsaiPrompt = `Generate a list of atleast 10 Bonsai for auction. 
        Output should be like this: 
        ${exampleOutput}
        `;
        const bonsaiList = await getRecipesFromGemini(bonsaiPrompt);
        res.status(200).json(bonsaiList);

    } catch (error) {
        console.error('Error generating bonsai list:', error);
        res.status(500).json({ error: error.message });
    }
};