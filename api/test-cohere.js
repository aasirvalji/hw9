const cohere = require('cohere-ai');
const path = require('path');
require("dotenv").config({ path: path.join(__dirname, ".env") });

cohere.init(process.env.COHERE_API_KEY);

(async () => {
    const response = await cohere.tokenize({
        text: "hello world"
    });
    console.log(response);
})();