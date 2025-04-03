import FootballDataApi from './api/footballDataApi.js';
import Model from './model/model.js';

(async function () {
    console.log("Iniciando la obtención de datos...");

    try {
        // ID de la Champions League
        const championsLeagueId = 2; // ID de la Champions League en la API

        // Solicitar ligas relacionadas con la Champions League
        console.log(`Solicitando ligas relacionadas con la Champions League (ID: ${championsLeagueId})...`);
        const ligasChampions = await FootballDataApi.obtenerLigas(championsLeagueId);
        console.log("Ligas relacionadas con la Champions League recibidas:", ligasChampions);

        // Crear arrays para almacenar equipos y partidos
        const equipos = [];
        const partidos = [];

        // Iterar sobre las ligas relacionadas con la Champions League
        for (const liga of ligasChampions) {
            console.log(`Procesando la liga: ${liga.league.name} (ID: ${liga.league.id})`);

            // Obtener equipos de la liga
            const equiposLiga = await FootballDataApi.obtenerEquipos(liga.league.id, 2023); // Temporada 2023
            equipos.push(...equiposLiga);
            console.log(`Equipos de la liga ${liga.league.name} recibidos:`, equiposLiga);

            // Obtener partidos de la liga
            const partidosLiga = await FootballDataApi.obtenerPartidos(liga.league.id, 2023); // Temporada 2023
            partidos.push(...partidosLiga);
            console.log(`Partidos de la liga ${liga.league.name} recibidos:`, partidosLiga);
        }

        // Almacenar los datos en el modelo
        Model.cargarDatosIniciales({ ligas: ligasChampions, equipos, partidos });
        console.log("Datos almacenados en el modelo.");

        console.log("Obtención de datos completada. Revisa los datos en la consola.");
    } catch (error) {
        console.error("Error al obtener los datos:", error);
    }
})();