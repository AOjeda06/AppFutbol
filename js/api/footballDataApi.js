const BASE_URL = 'https://www.thesportsdb.com/api/v1/json/3/';
const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';
const RETRY_DELAY = 3000; // 3 seconds

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
     * Obtiene la lista de ligas.
     * @returns {Promise<Array>} Lista de ligas.
     */
    obtenerLigas: async function () {
        console.log("Solicitando la lista de ligas...");
        try {
            const data = await this.fetchWithRetry(`${PROXY_URL}${BASE_URL}all_leagues.php`);
            console.log("Ligas recibidas:", data.leagues);
            return data.leagues || [];
        } catch (error) {
            console.error("Error al obtener la lista de ligas:", error);
            throw error;
        }
    },

    /**
     * Obtiene los equipos de una liga específica.
     * @param {string} leagueName - Nombre de la liga.
     * @returns {Promise<Array>} Lista de equipos.
     */
    obtenerEquipos: async function (leagueName) {
        console.log(`Solicitando equipos para la liga: ${leagueName}`);
        try {
            const data = await this.fetchWithRetry(`${PROXY_URL}${BASE_URL}search_all_teams.php?l=${encodeURIComponent(leagueName)}`);
            console.log("Equipos recibidos:", data.teams);
            return data.teams || [];
        } catch (error) {console.log("Selected portion is empty. Adding logs for API calls.");
console.log("API calls will be logged with the following format: 'API Call: [method] [url]'");
            console.error(`Error al obtener equipos para la liga ${leagueName}:`, error);
            throw error;
        }
    },

    /**
     * Obtiene los jugadores de un equipo específico.
     * @param {number} teamId - ID del equipo.
     * @returns {Promise<Array>} Lista de jugadores.
     */
    obtenerJugadores: async function (teamId) {
        console.log(`Solicitando jugadores para el equipo ID: ${teamId}`);
        try {
            const data = await this.fetchWithRetry(`${PROXY_URL}${BASE_URL}lookup_all_players.php?id=${teamId}`);
            console.log("Jugadores recibidos:", data.player);
            return data.player || [];
        } catch (error) {
            console.error(`Error al obtener jugadores para el equipo ID ${teamId}:`, error);
            throw error;
        }
    }
};

export default FootballDataApi;
