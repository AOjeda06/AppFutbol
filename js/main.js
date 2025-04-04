import FootballDataApi from '../js/api/footballDataApi.js';
import Model from '../js/model/model.js';

(async function () {
    console.log("Iniciando la obtención de datos...");

    try {
        // Note: If you encounter CORS issues, consider setting up your own proxy server.
        // Paso 1: Solicitar equipos de la Champions League
        const championsLeagueName = "UEFA Champions League";
        console.log(`Solicitando equipos de la Champions League (${championsLeagueName})...`);
        const equiposChampions = await FootballDataApi.obtenerEquipos(championsLeagueName);
        console.log("Equipos de la Champions League obtenidos:", equiposChampions);

        // Paso 2: Solicitar equipos de las 4 ligas principales
        const ligasNombres = [
            "English Premier League", // Premier League
            "Spanish La Liga",        // La Liga
            "Italian Serie A",        // Serie A
            "German Bundesliga"       // Bundesliga
        ];

        const equiposLigas = [];
        for (const ligaNombre of ligasNombres) {
            console.log(`Solicitando equipos de la liga ${ligaNombre}...`);
            const equiposLiga = await FootballDataApi.obtenerEquipos(ligaNombre);
            equiposLigas.push(...equiposLiga);
            console.log(`Equipos de la liga ${ligaNombre} obtenidos:`, equiposLiga);
        }

        // Paso 3: Solicitar jugadores de todos los equipos obtenidos en lotes
        const todosLosEquipos = [...equiposChampions, ...equiposLigas];
        const jugadores = [];
        const tasks = todosLosEquipos.map(equipo => async () => {
            console.log(`Solicitando jugadores del equipo ID: ${equipo.idTeam}...`);
            const jugadoresEquipo = await FootballDataApi.obtenerJugadoresEquipo(equipo.idTeam);
            jugadoresEquipo.forEach(jugador => {
                jugador.idTeam = equipo.idTeam; // Asignar el equipo al jugador
                jugador.strTeam = equipo.strTeam; // Asignar el equipo al jugador
            });
            jugadores.push(...jugadoresEquipo);

            // Asegurar que todas las ligas del equipo se procesen
            equipo.strLeague2 = equipo.strLeague2 || null;
            equipo.strLeague3 = equipo.strLeague3 || null;
            equipo.strLeague4 = equipo.strLeague4 || null;
            equipo.strLeague5 = equipo.strLeague5 || null;
            equipo.strLeague6 = equipo.strLeague6 || null;
            equipo.strLeague7 = equipo.strLeague7 || null;

            console.log(`Jugadores del equipo ID ${equipo.idTeam} obtenidos:`, jugadoresEquipo);
        });

        await FootballDataApi.processInBatches(tasks);

        // Paso 4: Almacenar los datos en el modelo
        Model.cargarDatosIniciales({ equipos: todosLosEquipos, jugadores });
        console.log("Datos almacenados en el modelo.");

        // Paso 5: Crear ligas y guardar en el modelo
        const equiposValidos = todosLosEquipos.filter(equipo => equipo?.idTeam && equipo?.strLeague);
        if (equiposValidos.length > 0) {
            Model.crearLigas();
            console.log("Ligas creadas y almacenadas en el modelo.");
        } else {
            console.error("No se encontraron equipos válidos para crear ligas.");
        }

        // Paso 6: Guardar los datos en el localStorage
        try {
            const equiposCompactos = todosLosEquipos.map(({ idTeam, strTeam, strLeague }) => ({ idTeam, strTeam, strLeague }));
            const jugadoresCompactos = jugadores.map(({ idPlayer, strPlayer, dateBorn, strNationality }) => ({ idPlayer, strPlayer, dateBorn, strNationality }));

            // Dividir jugadores en fragmentos más pequeños
            const fragmentSize = 100; // Tamaño del fragmento
            for (let i = 0; i < jugadoresCompactos.length; i += fragmentSize) {
                localStorage.setItem(`jugadores_${i / fragmentSize}`, JSON.stringify(jugadoresCompactos.slice(i, i + fragmentSize)));
            }

            // Guardar equipos
            localStorage.setItem('equipos', JSON.stringify(equiposCompactos));
            console.log("Datos guardados en el localStorage.");
        } catch (error) {
            if (error.name === "QuotaExceededError") {
                console.error("Error: El almacenamiento local ha excedido su cuota. Considera limpiar datos antiguos o reducir el tamaño de los datos.");
            } else {
                throw error;
            }
        }

        console.log("Obtención de datos completada.");
    } catch (error) {
        console.error("Error al obtener los datos:", error);
    }
})();