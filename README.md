## Gemini API-Powered Server ✨

This is a simple Node.js server that leverages the Gemini API to provide two main functionalities:

1. Recipe Generation: Generate recipe ideas based on ingredients, categories, or as a daily suggestion.

2. Bonsai Auction Item Generation: Generate a list of bonsai items for a hypothetical auction.

3. The server uses Express for routing and is configured to handle API requests and responses.

### Getting Started
Prerequisites

You will need the following installed on your machine:

+ Node.js

+ npm (Node Package Manager)

+ A Gemini API Key


### Installation
1. Clone the repository:

        git clone <your-repository-url>
        cd <your-repository-folder>

2. Install dependencies:

        npm install express cors body-parser dotenv @google/generative-ai

3. Set up your environment variables:
Create a .env file in the root directory and add your Gemini API key:

        API_KEY=YOUR_GEMINI_API_KEY

### Running the Server
To start the server, run the following command from the root directory:

    node index.js

The server will be running on http://localhost:3000 (or the port specified in your .env file).

### API Endpoints

All API endpoints are prefixed with /api.

1. **Recipe Generation 🧑‍🍳**

    - **Generate Recipe by Ingredients:**

        - Endpoint: `POST /api/generateRecipe`

        - Body:

            ```json
            {
                "ingredients": "eggs, flour, sugar",
                "category": "dessert"
            }
            ```

        - Description: Generates a list of recipes based on the provided ingredients. category is optional.

    - **Generate Daily Recipe:**

        - Endpoint: `POST /api/generateDailyRecipe`

        - Body: `{}` (empty body)

        - Description: Returns a list of daily recipe suggestions.

    - **Generate Recipe by Category:**

        - Endpoint: `POST /api/generateRecipeByCategory`

        - Body:

            ```json
            {
                "foodCategory": "soup"
            }
            ```

        - Description: Generates recipes belonging to a specific food category.

    - **Generate Recipe for a Specific Food:**

        - Endpoint: POST /api/generateRecipeOfThisFood

        - Body:

            ```json
            {
            "foodName": "pizza"
            }
            ```

        - Description: Generates different cooking options for a specific food item.

2. **Bonsai Auction Items 🌳**

    - **Generate Bonsai List:**

        - Endpoint: `GET /api/bonsaiList`

        - Description: Generates a list of bonsai items with details for a hypothetical auction.

### File Structure 📂

- `index.js`: The main entry point of the server.

- `routes.js`: Defines all the API endpoints and connects them to the controllers.

- `controllers/recipeControllers.js`: Contains the logic for the recipe generation endpoints.

- `controllers/bonsaiCntroller.js`: Contains the logic for the bonsai list generation endpoint.

- `config/gemini.js`: Sets up the connection to the Gemini API.

### Error Handling 🚧
- 404 Not Found: Returned for undefined endpoints.

- 400 Bad Request: Returned if required fields (e.g., ingredients, foodCategory) are missing from the request body.

- 500 Internal Server Error: Returned for server or Gemini API errors.