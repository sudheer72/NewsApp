const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const API_KEY = process.env.GNEWS_API_KEY;
const BASE_URL = 'https://gnews.io/api/v4';

// Endpoint to fetch news from GNews API
app.get('/news', async (req, res) => {
  try {
    const { query, lang = 'en', sortBy = 'publishedAt' } = req.query;
    const response = await axios.get(`${BASE_URL}/search`, {
      params: {
        q: query || 'latest',
        token: API_KEY,
        lang,
        sortBy,
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching news', error });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
