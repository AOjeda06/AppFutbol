import FootballDataApi from './api/footballDataApi.js';
import Model from './model/model.js';

(async () => {
    /*
    try {
        console.log("Iniciando la obtención de datos...");
        const equiposChampions = await FootballDataApi.obtenerEquiposChampions();

        // Procesar los jugadores de los equipos en lotes
        const jugadoresPorEquipo = await FootballDataApi.processInBatches(
            equiposChampions.map(equipo => async () => {
                console.log(`Procesando jugadores del equipo: ${equipo.strTeam}`);
                return await FootballDataApi.obtenerJugadoresEquipo(equipo.idTeam);
            })
        );

        // Filtrar resultados exitosos
        const jugadores = jugadoresPorEquipo
            .filter(result => result.status === 'fulfilled')
            .flatMap(result => result.value);

        console.log("Jugadores procesados:", jugadores);
    } catch (error) {
        console.error("Error al obtener los datos:", error);
    }
        */
})();