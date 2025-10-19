// stockImageFetcher.js

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

        const apiURLBase = 'https://pixabay.com/api/';
        const apiUrl = `${apiURLBase}?key=${pixabay_Api_Key}&q=${encodeURIComponent(itemName)}&image_type=photo&per_page=3`;

        // Use native fetch (no import needed in Node 18+)
        const response = await fetch(apiUrl);

        if (!response.ok) {
            return res.status(response.status).json({
                error: `Pixabay API error: ${response.status} ${response.statusText}`
            });
        }

        const data = await response.json();
        res.status(200).json(data);

    } catch (error) {
        console.error('Error fetching stock images:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};