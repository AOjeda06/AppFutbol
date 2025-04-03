import FootballDataApi from './api/footballDataApi.js';
import Model from './model/model.js';

(async function () {
    console.log("Iniciando la obtención de datos...");

    try {
        // ID de la Champions League
        const championsLeagueId = 2; // ID de la Champions League en la API
        const temporada = 2022; // Temporada 2022/2023

        // Paso 1: Obtener equipos que participan en la UCL
        console.log(`Solicitando equipos que participan en la Champions League (ID: ${championsLeagueId})...`);
        const equiposChampions = await FootballDataApi.obtenerEquipos(championsLeagueId, temporada);

        // Filtrar equipos válidos
        const equiposFiltrados = equiposChampions.filter(equipo => equipo.team && equipo.team.id);
        console.log("Equipos válidos de la Champions League recibidos:", equiposFiltrados);

        // Paso 2: Extraer IDs de las ligas de los equipos, eliminando duplicados
        const ligasSet = new Set(equiposFiltrados.map(equipo => equipo.team.league.id));
        const ligasIds = Array.from(ligasSet);
        console.log("IDs de ligas identificadas:", ligasIds);

        // Paso 3: Obtener datos agrupados por liga
        const datosLigas = [];
        for (const ligaId of ligasIds) {
            console.log(`Solicitando datos agrupados para la liga ID: ${ligaId}...`);
            const datosLiga = await FootballDataApi.obtenerDatosLiga(ligaId, temporada);
            datosLigas.push(datosLiga);
            console.log(`Datos recibidos para la liga ID ${ligaId}:`, datosLiga);
        }

        // Paso 4: Procesar los datos recibidos
        const equiposLigas = datosLigas.flatMap(dato => dato.equipos);
        const jugadores = datosLigas.flatMap(dato => dato.jugadores);

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