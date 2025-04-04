const BASE_URL = 'https://www.thesportsdb.com/api/v1/json/3/';
// Removed PROXY_URL as it causes 403 errors
const RETRY_DELAY = 10000; // 10 segundos
const MAX_CONCURRENT_REQUESTS = 5; // Reducir concurrencia para evitar límite de API

const FootballDataApi = {
    /**
     * Realiza una solicitud con reintentos en caso de error 429.
     * @param {string} url - URL de la solicitud.
     * @param {number} retries - Número de reintentos permitidos.
     * @returns {Promise<Object>} Respuesta de la solicitud.
     */
    fetchWithRetry: async function (url, retries = 3) {
        try {
            const response = await fetch(url); // Removed PROXY_URL
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
     * Obtiene los equipos de una liga específica.
     * @param {string} leagueName - Nombre de la liga.
     * @returns {Promise<Array>} Lista de equipos de la liga.
     */
    obtenerEquipos: async function (leagueName) {
        console.log(`Obteniendo equipos de la liga: ${leagueName}`);
        try {
            const url = `${BASE_URL}search_all_teams.php?l=${encodeURIComponent(leagueName)}`;
            const response = await this.fetchWithRetry(url);
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
            const url = `${BASE_URL}lookup_all_players.php?id=${teamId}`;
            const response = await this.fetchWithRetry(url);
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
            await new Promise(resolve => setTimeout(resolve, RETRY_DELAY)); // Retraso entre lotes
        }
        return results;
    }
};

export default FootballDataApi;
