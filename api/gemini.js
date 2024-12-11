const axios = require('axios');

const API_KEY_NAME = 'GEMINI_API_KEY';
const GEMINI_API_KEY = process.env[API_KEY_NAME];
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';

module.exports = async (req, res) => {
  try {
    if (req.method !== 'POST') {
      console.log(`Invalid method: ${req.method}`);
      res.status(405).json({ error: 'Only POST requests are allowed' });
      return;
    }

    if (!req.body || !req.body.input) {
      console.log('Invalid input:', req.body);
      res.status(400).json({ error: 'Request body must contain an "input" field' });
      return;
    }

    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              { text: req.body.input },
            ],
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.log('API error:', error.message || error.response.data);
    res.status(500).json({ error: 'An error occurred while processing your request' });
  }
};
