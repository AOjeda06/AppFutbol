import axios from 'axios';

const API_KEY = 'TU_CLAVE_DE_API'; // Reemplaza con tu clave de API
const BASE_URL = 'https://api.football-data.org/v4';

const FootballDataApi = {
    // Obtener datos de una liga específica
    obtenerLiga: async function (ligaId) {
        try {
            const response = await axios.get(`${BASE_URL}/competitions/${ligaId}/standings`, {
                headers: { 'X-Auth-Token': API_KEY }
            });
            return response.data;
        } catch (error) {
            console.error('Error al obtener datos de la liga:', error);
            throw error;
        }
    },

    // Obtener equipos de una competición
    obtenerEquipos: async function (ligaId) {
        try {
            const response = await axios.get(`${BASE_URL}/competitions/${ligaId}/teams`, {
                headers: { 'X-Auth-Token': API_KEY }
            });
            return response.data.teams;
        } catch (error) {
            console.error('Error al obtener equipos:', error);
            throw error;
        }
    },

    // Obtener partidos de una competición
    obtenerPartidos: async function (ligaId) {
        try {
            const response = await axios.get(`${BASE_URL}/competitions/${ligaId}/matches`, {
                headers: { 'X-Auth-Token': API_KEY }
            });
            return response.data.matches;
        } catch (error) {
            console.error('Error al obtener partidos:', error);
            throw error;
        }
    },

    // Obtener ligas por área (país)
    obtenerLigasPorArea: async function (areaId) {
        try {
            const response = await axios.get(`${BASE_URL}/areas/${areaId}/competitions`, {
                headers: { 'X-Auth-Token': API_KEY }
            });
            return response.data.competitions;
        } catch (error) {
            console.error('Error al obtener ligas por área:', error);
            throw error;
        }
    }
};

export default FootballDataApi;
