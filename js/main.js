import FootballDataApi from './api/footballDataApi.js';
import Model from './model/model.js';

(async function () {
    console.log("Iniciando la obtención de datos...");

    try {
        // Mapeo de países a ligas principales (IDs de ligas)
        const ligasPorPais = {
            England: { id: 39, name: "Premier League" },
            Spain: { id: 140, name: "La Liga" },
            Italy: { id: 135, name: "Serie A" },
            Germany: { id: 78, name: "Bundesliga" },
            France: { id: 61, name: "Ligue 1" },
            // Agregar más países y ligas según sea necesario
        };

        // ID de la Champions League
        const championsLeagueId = 2; // ID de la Champions League en la API
        const temporada = 2022; // Temporada 2022/2023

        // Paso 1: Obtener equipos que participan en la UCL
        console.log(`Solicitando equipos que participan en la Champions League (ID: ${championsLeagueId})...`);
        const equiposChampions = await FootballDataApi.obtenerEquipos(championsLeagueId, temporada);

        // Filtrar equipos válidos
        const equiposFiltrados = equiposChampions.filter(equipo => equipo.team && equipo.team.id); // Verifica que 'team' y 'team.id' existan
        console.log("Equipos válidos de la Champions League recibidos:", equiposFiltrados);

        // Paso 2: Identificar las ligas de los equipos
        const ligasSet = new Set();
        equiposFiltrados.forEach(equipo => {
            const pais = equipo.team.country;
            const esNacional = equipo.team.national;

            // Si el equipo no es nacional, buscar la liga principal del país
            if (!esNacional && ligasPorPais[pais]) {
                ligasSet.add(ligasPorPais[pais].id);
            }
        });

        const ligasIds = Array.from(ligasSet);
        console.log("IDs de ligas identificadas:", ligasIds);

        // Paso 3: Obtener datos de equipos y jugadores por liga
        const datosLigas = [];
        for (const ligaId of ligasIds) {
            console.log(`Solicitando equipos para la liga ID: ${ligaId}...`);
            const equiposLiga = await FootballDataApi.obtenerEquipos(ligaId, temporada);

            console.log(`Solicitando jugadores para los equipos de la liga ID: ${ligaId}...`);
            const jugadoresLiga = [];
            for (const equipo of equiposLiga) {
                const jugadoresEquipo = await FootballDataApi.obtenerJugadores(equipo.team.id);
                jugadoresLiga.push(...jugadoresEquipo);
            }

            datosLigas.push({ equipos: equiposLiga, jugadores: jugadoresLiga });
            console.log(`Datos recibidos para la liga ID ${ligaId}:`, { equipos: equiposLiga, jugadores: jugadoresLiga });
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