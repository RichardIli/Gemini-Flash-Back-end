const { GoogleGenerativeAI } = require('@google/generative-ai');

const api_Key = process.env.API_KEY;
if (!api_Key) {
    console.error('API_KEY is not defined in environment variables.');
    process.exit(1);
}
const genAI = new GoogleGenerativeAI(api_Key);
const model = genAI.getGenerativeModel({
    model: 'gemini-2.5-flash',
    generationConfig: { responseMimeType: "application/json" },
});

// this code is currently useless because the gemini-2.5-flash-image model is not available yet for free usage
// generate image one by one.
// in the prompt, specify that the responce of the ai will contains itemName and image(i dont know what type of image is more efficient when passing through api)
// const imageGenerationModel = genAI.getGenerativeModel({
//     model: 'gemini-2.5-flash-image',
//     generationConfig: {
//         responseMimeType: "application/json",
//     },
//     config: {
//         imageConfig: {
//             aspectRatio: "16:9",
//         },
//     }
// });

module.exports = { 
    model, 
    // imageGenerationModel,
};

// TODO: text the new ai api request