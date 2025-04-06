import FootballDataApi from '../js/api/footballDataApi.js';
import Model from '../js/model/model.js';

(async function () {
    console.log("Iniciando la obtención de datos...");

    try {
        // Función para obtener equipos de múltiples ligas
        const obtenerEquiposDeLigas = async (ligas) => {
            const equipos = [];
            for (const liga of ligas) {
                console.log(`Solicitando equipos de la liga ${liga}...`);
                const equiposLiga = await FootballDataApi.obtenerEquipos(liga);
                equipos.push(...equiposLiga);
                console.log(`Equipos de la liga ${liga} obtenidos:`, equiposLiga);
            }
            return equipos;
        };

        // Paso 1: Solicitar equipos de las 5 grandes ligas europeas
        const ligasNombres = [
            "French Ligue 1",         // Ligue 1
            "English Premier League", // Premier League
            "Spanish La Liga",        // La Liga
            "Italian Serie A",        // Serie A
            "German Bundesliga"       // Bundesliga
        ];
        const todosLosEquipos = await obtenerEquiposDeLigas(ligasNombres);

        // Paso 2: Almacenar los datos en el modelo
        Model.cargarDatosIniciales({ equipos: todosLosEquipos });
        console.log("Datos almacenados en el modelo.");

        // Paso 3: Crear ligas y guardar en el modelo
        const equiposValidos = todosLosEquipos.filter(equipo => equipo?.idTeam && equipo?.strLeague);
        if (equiposValidos.length > 0) {
            Model.crearLigas();
            console.log("Ligas creadas y almacenadas en el modelo.");
        } else {
            console.error("No se encontraron equipos válidos para crear ligas.");
        }

        // Paso 4: Guardar los datos en el localStorage
        const guardarEnLocalStorage = (clave, datos, fragmentSize = 100) => {
            try {
                for (let i = 0; i < datos.length; i += fragmentSize) {
                    localStorage.setItem(`${clave}_${i / fragmentSize}`, JSON.stringify(datos.slice(i, i + fragmentSize)));
                }
                console.log(`Datos guardados en el localStorage bajo la clave: ${clave}`);
            } catch (error) {
                if (error.name === "QuotaExceededError") {
                    console.error("Error: El almacenamiento local ha excedido su cuota. Considera limpiar datos antiguos o reducir el tamaño de los datos.");
                } else {
                    throw error;
                }
            }
        };

        guardarEnLocalStorage('equipos', todosLosEquipos.map(({ idTeam, strTeam, strLeague }) => ({ idTeam, strTeam, strLeague })));

        console.log("Obtención de datos completada.");
    } catch (error) {
        console.error("Error al obtener los datos:", error);
    }
})();