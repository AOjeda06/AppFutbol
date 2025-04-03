const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

const API_KEY = '63c2dc2585864c2aaf7efa1ed187db0a';
const BASE_URL = 'https://v3.football.api-sports.io';

app.use(express.json());

app.get('/api/:endpoint', async (req, res) => {
    const endpoint = req.params.endpoint;
    const query = req.query;

    try {
        const response = await axios.get(`${BASE_URL}/${endpoint}`, {
            headers: {
                'x-rapidapi-key': API_KEY,
                'x-rapidapi-host': 'v3.football.api-sports.io'
            },
            params: query
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error al realizar la solicitud a la API:', error.message);
        res.status(500).json({ error: 'Error al obtener datos de la API' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor proxy corriendo en http://localhost:${PORT}`);
});
