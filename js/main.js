import FootballDataApi from './api/footballDataApi.js';
import Model from './model/model.js';
import './server.js'; // Updated path for server.js

(async function () {
    console.log("Iniciando la obtención de datos...");

    try {
        // ID de la Champions League
        const championsLeagueId = 2; // ID de la Champions League en la API

        // Paso 1: Obtener equipos que participan en la UCL
        console.log(`Solicitando equipos que participan en la Champions League (ID: ${championsLeagueId})...`);
        const equiposChampions = await FootballDataApi.obtenerEquipos(championsLeagueId, 2023);
        console.log("Equipos de la Champions League recibidos:", equiposChampions);

        // Paso 2: Identificar las ligas de los equipos (sin duplicados)
        const ligasSet = new Set();
        for (const equipo of equiposChampions) {
            const liga = await FootballDataApi.obtenerLigaDeEquipo(equipo.team.id);
            if (liga) {
                ligasSet.add(liga.id);
            }
        }
        const ligasIds = Array.from(ligasSet);
        console.log("Ligas identificadas:", ligasIds);

        // Paso 3: Obtener los equipos de cada liga
        const equiposLigas = [];
        for (const ligaId of ligasIds) {
            console.log(`Solicitando equipos de la liga ID: ${ligaId}...`);
            const equiposLiga = await FootballDataApi.obtenerEquipos(ligaId, 2023);
            equiposLigas.push(...equiposLiga);
            console.log(`Equipos de la liga ID ${ligaId} recibidos:`, equiposLiga);
        }

        // Paso 4: Obtener los jugadores de cada equipo
        const jugadores = [];
        for (const equipo of equiposLigas) {
            console.log(`Solicitando jugadores del equipo: ${equipo.team.name} (ID: ${equipo.team.id})...`);
            const jugadoresEquipo = await FootballDataApi.obtenerJugadores(equipo.team.id);
            jugadores.push(...jugadoresEquipo);
            console.log(`Jugadores del equipo ${equipo.team.name} recibidos:`, jugadoresEquipo);
        }

        // Almacenar los datos en el modelo
        Model.cargarDatosIniciales({ equipos: equiposLigas, jugadores });
        console.log("Datos almacenados en el modelo.");

        // Guardar los datos en el localStorage
        localStorage.setItem('equipos', JSON.stringify(equiposLigas));
        localStorage.setItem('jugadores', JSON.stringify(jugadores));
        console.log("Datos guardados en el localStorage.");

        console.log("Obtención de datos completada. Revisa los datos en la consola.");
    } catch (error) {
        console.error("Error al obtener los datos:", error);
    }
})();