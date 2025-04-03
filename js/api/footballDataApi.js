const BASE_URL = 'https://v3.football.api-sports.io'; // URL directa de la API
const API_KEY = '63c2dc2585864c2aaf7efa1ed187db0a'; // Tu clave de API

let datosCache = {
    ligas: null,
    equipos: {},
    partidos: {}
};

const FootballDataApi = {
    obtenerLigas: async function (ligaId = null) {
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
                data: ligaId ? { id: ligaId } : {}, // Filtrar por ID si se proporciona
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

    obtenerEquipos: async function (ligaId, temporada) {
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
                    if (response.response && response.response.length > 0) {
                        datosCache.equipos[ligaId] = response.response; // Guardar en caché
                        resolve(response.response);
                    } else {
                        console.warn("La API devolvió un array vacío para los equipos.");
                        resolve([]);
                    }
                },
                error: function (error) {
                    console.error("Error al obtener equipos:", error);
                    reject(error);
                }
            });
        });
    },

    obtenerPartidos: async function (ligaId, temporada) {
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
                data: { league: ligaId, season: temporada },
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
                data: { team: equipoId, season: 2023 },
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
    }
};

export default FootballDataApi;
