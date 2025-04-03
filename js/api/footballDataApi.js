const BASE_URL = 'https://www.thesportsdb.com/api/v1/json/3/';
const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';
const RETRY_DELAY = 10000; // 10 seconds
const MAX_CONCURRENT_REQUESTS = 3; // Limit concurrent requests

const FootballDataApi = {
    /**
     * Realiza una solicitud con reintentos en caso de error 429.
     * @param {string} url - URL de la solicitud.
     * @param {number} retries - Número de reintentos permitidos.
     * @returns {Promise<Object>} Respuesta de la solicitud.
     */
    fetchWithRetry: async function (url, retries = 3) {
        try {
            const response = await fetch(url);
            if (response.status === 429 && retries > 0) {
                console.warn(`Rate limit hit. Retrying in ${RETRY_DELAY / 1000} seconds...`);
                await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
                return this.fetchWithRetry(url, retries - 1);
            }
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error(`Error fetching ${url}:`, error);
            throw error;
        }
    },

    /**
     * Obtiene los equipos de la Champions League.
     * @returns {Promise<Array>} Lista de equipos de la Champions League.
     */
    obtenerEquiposChampions: async function () {
        console.log("Obteniendo equipos de la Champions League...");
        try {
            const response = await this.fetchWithRetry(`${PROXY_URL}${BASE_URL}search_all_teams.php?l=UEFA%20Champions%20League`);
            return response.teams || [];
        } catch (error) {
            console.error("Error al obtener equipos de la Champions League:", error);
            throw error;
        }
    },

    /**
     * Obtiene los equipos de una liga específica.
     * @param {string} leagueName - Nombre de la liga.
     * @returns {Promise<Array>} Lista de equipos de la liga.
     */
    obtenerEquiposLiga: async function (leagueName) {
        console.log(`Obteniendo equipos de la liga: ${leagueName}`);
        try {
            const response = await this.fetchWithRetry(`${PROXY_URL}${BASE_URL}search_all_teams.php?l=${encodeURIComponent(leagueName)}`);
            return response.teams || [];
        } catch (error) {
            console.error(`Error al obtener equipos de la liga ${leagueName}:`, error);
            throw error;
        }
    },

    /**
     * Obtiene los jugadores de un equipo específico.
     * @param {number} teamId - ID del equipo.
     * @returns {Promise<Array>} Lista de jugadores del equipo.
     */
    obtenerJugadoresEquipo: async function (teamId) {
        console.log(`Obteniendo jugadores del equipo ID: ${teamId}`);
        try {
            const response = await this.fetchWithRetry(`${PROXY_URL}${BASE_URL}lookup_all_players.php?id=${teamId}`);
            return response.player || [];
        } catch (error) {
            console.error(`Error al obtener jugadores del equipo ID ${teamId}:`, error);
            throw error;
        }
    },

    /**
     * Procesa solicitudes en lotes para limitar la concurrencia.
     * @param {Array<Function>} tasks - Array de funciones que devuelven promesas.
     * @returns {Promise<Array>} Resultados de las tareas.
     */
    processInBatches: async function (tasks) {
        const results = [];
        while (tasks.length > 0) {
            const batch = tasks.splice(0, MAX_CONCURRENT_REQUESTS);
            const batchResults = await Promise.allSettled(batch.map(task => task()));
            results.push(...batchResults);
            console.log(`Esperando ${RETRY_DELAY / 1000} segundos antes de procesar el siguiente lote...`);
            await new Promise(resolve => setTimeout(resolve, RETRY_DELAY)); // Delay between batches
        }
        return results;
    }
};

export default FootballDataApi;
