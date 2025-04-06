const BASE_URL = 'https://www.thesportsdb.com/api/v1/json/3/';
const RETRY_DELAY = 667; // ~667 ms por lote (1 segundo dividido entre 1.5 peticiones)

const FootballDataApi = {
    /**
     * Realiza una solicitud con reintentos en caso de error 429.
     * @param {string} url - URL de la solicitud.
     * @param {number} retries - Número de reintentos permitidos.
     * @returns {Promise<Object>} Respuesta de la solicitud.
     */
    fetchWithRetry: async function (url, retries = 3) {
        while (retries > 0) {
            try {
                const response = await fetch(url);
                if (response.ok) return await response.json();
                if (response.status === 429) {
                    console.warn(`Rate limit hit. Retrying in ${RETRY_DELAY / 1000} seconds...`);
                    await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
                } else {
                    throw new Error(`Error HTTP: ${response.status}`);
                }
            } catch (error) {
                if (--retries === 0) {
                    console.error(`Error fetching ${url}:`, error);
                    throw error;
                }
            }
        }
    },

    /**
     * Obtiene los equipos de una liga específica.
     * @param {string} leagueName - Nombre de la liga.
     * @returns {Promise<Array>} Lista de equipos de la liga.
     */
    obtenerEquipos: async function (leagueName) {
        const url = `${BASE_URL}search_all_teams.php?l=${encodeURIComponent(leagueName)}`;
        console.log(`Obteniendo equipos de la liga: ${leagueName}`);
        return (await this.fetchWithRetry(url)).teams || [];
    }
};

export default FootballDataApi;
