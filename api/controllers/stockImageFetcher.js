// stockImageFetcher.js

const fetch = require('node-fetch').default; // Ensure node-fetch is required

exports.retreiveImage = async (req, res) => {
    try {
        const { itemName } = req.body;
        if (!itemName) {
            return res.status(400).json({ error: 'itemName must be a non-empty string.' });
        }

        const pixabay_Api_Key = process.env.PIXABAY_API_KEY;
        if (!pixabay_Api_Key) {
            return res.status(500).json({ error: 'PIXABAY_API_KEY is not defined in environment variables.' });
        }
        // Placeholder logic for fetching images based on item names
        const apiURLBase = 'https://pixabay.com/api/';
        const apiUrl = `${apiURLBase}?key=${pixabay_Api_Key}&q=` + encodeURIComponent(itemName) + '&image_type=photo&per_page=3';

        // Await the fetch and process the response
        const response = await fetch(apiUrl);

        if (!response.ok) {
            // console.error(`Pixabay API error: ${response.status} ${response.statusText}`);
            return res.status(response.status).json({ error: `Pixabay API error: ${response.status} ${response.statusText}` });
        }

        const data = await response.json();
        // console.log('Data received:', data);
        res.status(200).json(data); // Send the data back to the client


    } catch (error) {
        // console.error('Error fetching stock images:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};