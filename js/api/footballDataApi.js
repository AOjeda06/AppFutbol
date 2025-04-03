const BASE_URL = 'https://v3.football.api-sports.io'; // URL base de la API
const API_KEY = 'a6d27c0afd1d9ddd611c8535b701c8f0'; // Clave de API para autenticación

// Objeto para almacenar datos en caché y evitar solicitudes repetidas
let datosCache = {
    ligas: null,
    equipos: {},
    partidos: {},
    timezones: null
};

// Función para obtener la lista de zonas horarias disponibles
// Utiliza caché si los datos ya han sido solicitados previamente
async function obtenerTimezones() {
    if (datosCache.timezones) {
        console.log("Usando zonas horarias desde la caché.");
        return datosCache.timezones;
    }

    console.log("Solicitando zonas horarias...");
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `${BASE_URL}/timezone`,
            method: 'GET',
            headers: {
                'x-rapidapi-key': API_KEY,
                'x-rapidapi-host': 'v3.football.api-sports.io'
            },
            success: function (response) {
                console.log("Zonas horarias recibidas:", response.response);
                datosCache.timezones = response.response; // Guardar en caché
                resolve(response.response);
            },
            error: function (error) {
                console.error("Error al obtener zonas horarias:", error);
                reject(error);
            }
        });
    });
}

// Objeto que contiene métodos para interactuar con la API de datos de fútbol
const FootballDataApi = {
    /**
     * Obtiene la lista de ligas o una liga específica.
     * @param {number|null} ligaId - ID de la liga (opcional).
     * @param {string} timezone - Zona horaria (opcional).
     * @returns {Promise<Array>} Lista de ligas.
     */
    obtenerLigas: async function (ligaId = null, timezone = 'Europe/London') {
        if (datosCache.ligas && !ligaId) {
            console.log("Usando datos de ligas desde la caché.");
            return datosCache.ligas;
        }

        console.log(`Solicitando la lista de ligas${ligaId ? ` para la liga ID: ${ligaId}` : ''}...`);
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `${BASE_URL}/leagues`,
                method: 'GET',
                headers: {
                    'x-rapidapi-key': API_KEY,
                    'x-rapidapi-host': 'v3.football.api-sports.io'
                },
                data: ligaId ? { id: ligaId, timezone } : { timezone },
                success: function (response) {
                    console.log("Respuesta completa de la API para ligas:", response);
                    if (response.response && response.response.length > 0) {
                        if (!ligaId) datosCache.ligas = response.response; // Guardar en caché si no se filtra por ID
                        resolve(response.response);
                    } else {
                        console.warn("La API devolvió un array vacío para las ligas.");
                        resolve([]);
                    }
                },
                error: function (error) {
                    console.error("Error al obtener la lista de ligas:", error);
                    reject(error);
                }
            });
        });
    },

    /**
     * Obtiene los equipos de una liga para una temporada específica.
     * @param {number} ligaId - ID de la liga.
     * @param {number} temporada - Año de la temporada.
     * @returns {Promise<Array>} Lista de equipos.
     */
    obtenerEquipos: async function (ligaId, temporada = 2022) {
        if (datosCache.equipos[ligaId]) {
            console.log(`Usando datos de equipos para la liga ID: ${ligaId} desde la caché.`);
            return datosCache.equipos[ligaId];
        }

        console.log(`Solicitando equipos para la liga ID: ${ligaId}, temporada: ${temporada}`);
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `${BASE_URL}/teams`,
                method: 'GET',
                headers: {
                    'x-rapidapi-key': API_KEY,
                    'x-rapidapi-host': 'v3.football.api-sports.io'
                },
                data: { league: ligaId, season: temporada },
                success: function (response) {
                    console.log("Respuesta completa de la API para equipos:", response);

                    // Validar que la respuesta tenga el formato esperado
                    if (response && response.response && Array.isArray(response.response)) {
                        datosCache.equipos[ligaId] = response.response; // Guardar en caché
                        resolve(response.response);
                    } else {
                        console.warn("La API devolvió un formato inesperado para los equipos.");
                        resolve([]); // Retornar un array vacío si el formato no es válido
                    }
                },
                error: function (error) {
                    console.error("Error al obtener equipos:", error);
                    reject(error);
                }
            });
        });
    },

    /**
     * Obtiene los partidos de una liga para una temporada específica.
     * @param {number} ligaId - ID de la liga.
     * @param {number} temporada - Año de la temporada.
     * @param {string} timezone - Zona horaria (opcional).
     * @returns {Promise<Array>} Lista de partidos.
     */
    obtenerPartidos: async function (ligaId, temporada = 2022, timezone = 'Europe/London') {
        if (datosCache.partidos[ligaId]) {
            console.log(`Usando datos de partidos para la liga ID: ${ligaId} desde la caché.`);
            return datosCache.partidos[ligaId];
        }

        console.log(`Solicitando partidos para la liga ID: ${ligaId}, temporada: ${temporada}`);
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `${BASE_URL}/fixtures`,
                method: 'GET',
                headers: {
                    'x-rapidapi-key': API_KEY,
                    'x-rapidapi-host': 'v3.football.api-sports.io'
                },
                data: { league: ligaId, season: temporada, timezone },
                success: function (response) {
                    console.log("Partidos recibidos:", response.response);
                    if (response.response && response.response.length > 0) {
                        datosCache.partidos[ligaId] = response.response; // Guardar en caché
                        resolve(response.response);
                    } else {
                        console.warn("La API devolvió un array vacío para los partidos.");
                        resolve([]);
                    }
                },
                error: function (error) {
                    console.error("Error al obtener partidos:", error);
                    reject(error);
                }
            });
        });
    },

    /**
     * Obtiene los jugadores de un equipo específico.
     * @param {number} equipoId - ID del equipo.
     * @returns {Promise<Array>} Lista de jugadores.
     */
    obtenerJugadores: async function (equipoId) {
        console.log(`Solicitando jugadores para el equipo ID: ${equipoId}`);
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `${BASE_URL}/players`,
                method: 'GET',
                headers: {
                    'x-rapidapi-key': API_KEY,
                    'x-rapidapi-host': 'v3.football.api-sports.io'
                },
                data: { team: equipoId, season: 2022 },
                success: function (response) {
                    console.log("Jugadores recibidos:", response.response);
                    if (response.response && response.response.length > 0) {
                        resolve(response.response);
                    } else {
                        console.warn("La API devolvió un array vacío para los jugadores.");
                        resolve([]);
                    }
                },
                error: function (error) {
                    console.error("Error al obtener jugadores:", error);
                    reject(error);
                }
            });
        });
    },

    /**
     * Obtiene la liga a la que pertenece un equipo específico.
     * @param {number} equipoId - ID del equipo.
     * @returns {Promise<Object|null>} Información de la liga o null si no existe.
     */
    obtenerLigaDeEquipo: async function (equipoId) {
        console.log(`Solicitando la liga del equipo ID: ${equipoId}`);
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `${BASE_URL}/teams`,
                method: 'GET',
                headers: {
                    'x-rapidapi-key': API_KEY,
                    'x-rapidapi-host': 'v3.football.api-sports.io'
                },
                data: { id: equipoId },
                success: function (response) {
                    console.log("Liga del equipo recibida:", response.response);
                    if (response.response && response.response.length > 0) {
                        resolve(response.response[0].team.league);
                    } else {
                        console.warn("La API devolvió un array vacío para la liga del equipo.");
                        resolve(null);
                    }
                },
                error: function (error) {
                    console.error("Error al obtener la liga del equipo:", error);
                    reject(error);
                }
            });
        });
    },

    /**
     * Obtiene datos agrupados de una liga, incluyendo equipos y jugadores.
     * @param {number} ligaId - ID de la liga.
     * @param {number} temporada - Año de la temporada.
     * @returns {Promise<Object>} Objeto con equipos y jugadores.
     */
    obtenerDatosLiga: async function (ligaId, temporada) {
        console.log(`Solicitando datos agrupados para la liga ID: ${ligaId}, temporada: ${temporada}`);
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `${BASE_URL}/leagues/${ligaId}/teams-and-players`,
                method: 'GET',
                headers: {
                    'x-rapidapi-key': API_KEY,
                    'x-rapidapi-host': 'v3.football.api-sports.io'
                },
                data: { season: temporada },
                success: function (response) {
                    console.log("Datos agrupados recibidos:", response);
                    if (response.response) {
                        const equipos = response.response.teams || [];
                        const jugadores = response.response.players || [];
                        resolve({ equipos, jugadores });
                    } else {
                        console.warn("La API devolvió un array vacío para los datos agrupados.");
                        resolve({ equipos: [], jugadores: [] });
                    }
                },
                error: function (error) {
                    console.error("Error al obtener datos agrupados:", error);
                    reject(error);
                }
            });
        });
    },

    obtenerTimezones
};

export default FootballDataApi;
