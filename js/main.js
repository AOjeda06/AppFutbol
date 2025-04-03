import FootballDataApi from './api/footballDataApi.js';
import Model from './model/model.js';

(async () => {
    try {
<<<<<<< HEAD
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
=======
        // Obtener la lista de ligas
        const ligas = await FootballDataApi.obtenerLigas();
        const ligasSeleccionadas = ligas.slice(0, 5); // Limitar a 5 ligas para pruebas

        const datosLigas = await Promise.all(
            ligasSeleccionadas.map(async liga => {
                try {
                    // Obtener equipos de la liga
                    const equipos = await FootballDataApi.obtenerEquipos(liga.strLeague);

                    // Obtener jugadores de cada equipo
                    const jugadoresPorEquipo = await Promise.all(
                        equipos.map(async equipo => {
                            const jugadores = await FootballDataApi.obtenerJugadores(equipo.idTeam);
                            return { equipo, jugadores };
                        })
                    );

                    return { liga, equipos: jugadoresPorEquipo };
                } catch (error) {
                    console.error(`Error al procesar la liga ${liga.strLeague}:`, error);
                    throw error;
                }
            })
        );

        // Procesar los datos recibidos
        console.log("Datos de ligas procesados:", datosLigas);

        // Almacenar los datos en el modelo
        Model.cargarDatosIniciales(datosLigas);
        console.log("Datos almacenados en el modelo.");

        // Guardar los datos en el localStorage
        localStorage.setItem('ligas', JSON.stringify(datosLigas));
        console.log("Datos guardados en el localStorage.");

        console.log("Obtención de datos completada. Revisa los datos en la consola.");
>>>>>>> 5d1ca5755ea96c80916d3c171cedd83d2df48da1
    } catch (error) {
        console.error("Error al obtener los datos:", error);
    }
})();