import axios from 'axios';

const BASE_URL = 'https://v3.football.api-sports.io';
const API_KEY = '63c2dc2585864c2aaf7efa1ed187db0a'; // Tu clave de API

const FootballDataApi = {
    obtenerLiga: async function (ligaId) {
        try {
            console.log(`Solicitando datos de la liga con ID: ${ligaId}`);
            const response = await axios.get(`${BASE_URL}/leagues`, {
                headers: { 'x-rapidapi-key': API_KEY, 'x-rapidapi-host': 'v3.football.api-sports.io' },
                params: { id: ligaId }
            });
            console.log("Respuesta de la API para la liga:", response.data);
            return response.data.response;
        } catch (error) {
            console.error("Error al obtener datos de la liga:", error.response?.data || error.message);
            throw error;
        }
    },

    obtenerEquipos: async function (ligaId, temporada) {
        try {
            const response = await axios.get(`${BASE_URL}/teams`, {
                headers: { 'x-rapidapi-key': API_KEY, 'x-rapidapi-host': 'v3.football.api-sports.io' },
                params: { league: ligaId, season: temporada }
            });
            return response.data.response;
        } catch (error) {
            console.error('Error al obtener equipos:', error);
            throw error;
        }
    },

    obtenerPartidos: async function (ligaId, temporada) {
        try {
            const response = await axios.get(`${BASE_URL}/fixtures`, {
                headers: { 'x-rapidapi-key': API_KEY, 'x-rapidapi-host': 'v3.football.api-sports.io' },
                params: { league: ligaId, season: temporada }
            });
            return response.data.response;
        } catch (error) {
            console.error('Error al obtener partidos:', error);
            throw error;
        }
    },

    obtenerPartidosDeHoy: async function () {
        try {
            const response = await axios.get(`${BASE_URL}/fixtures`, {
                headers: { 'x-rapidapi-key': API_KEY, 'x-rapidapi-host': 'v3.football.api-sports.io' },
                params: { date: new Date().toISOString().split('T')[0] }
            });
            return response.data.response;
        } catch (error) {
            console.error('Error al obtener partidos de hoy:', error);
            throw error;
        }
    }
};

export default FootballDataApi;
