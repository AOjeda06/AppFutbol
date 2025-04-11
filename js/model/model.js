// Importar las clases de las entidades.
import Jugador from './entidades/jugador.js';
import Equipo from './entidades/equipo.js';
import Liga from './entidades/liga.js';

// Contadores para asignar IDs únicos.
let jugadorIdCounter = 0;
let equipoIdCounter = 0;

// Arrays para almacenar los objetos.
let jugadores = [];
let equipos = [];
let ligas = []; // Array para almacenar las ligas.

/**
 * Clase Model: Actúa como una capa de datos para la aplicación.
 */
export class Model {
    // Arrays para almacenar los datos de equipos y jugadores.
    equipos = [];
    jugadores = [];

    /**
     * Inicializa el modelo con datos desde localStorage si están disponibles.
     */
    async inicializar() {
        const jugadoresGuardados = localStorage.getItem('jugadores');
        if (jugadoresGuardados) {
            jugadores = JSON.parse(jugadoresGuardados);
            console.log("Datos de jugadores cargados desde localStorage.");
        } else {
            console.log("No se encontraron datos de jugadores en localStorage.");
        }
    }

    /**
     * Guarda el estado actual de los datos en localStorage.
     */
    guardarEstado() {
        try {
            const jugadoresCompactos = (jugadores || []).map(jugador => ({
                id: jugador?.id || null,
                name: jugador?.name || null,
                dateOfBirth: jugador?.dateOfBirth || null,
                nationality: jugador?.nationality || null,
                equipoId: jugador?.equipoId || null
            }));

            const fragmentSize = 100; // Tamaño de cada fragmento.
            for (let i = 0; i < jugadoresCompactos.length; i += fragmentSize) {
                localStorage.setItem(`jugadores_${i / fragmentSize}`, JSON.stringify(jugadoresCompactos.slice(i, i + fragmentSize)));
            }

            console.log("Estado guardado en localStorage.");
        } catch (error) {
            if (error.name === "QuotaExceededError") {
                console.warn("Error: No se pudo guardar el estado en localStorage debido a la cuota excedida.");
            } else {
                throw error;
            }
        }
    }

    /**
     * Agrega un nuevo jugador al modelo.
     * @param {string} nombre - Nombre del jugador.
     * @param {string} posicion - Posición del jugador.
     * @param {string} nacimiento - Fecha de nacimiento del jugador.
     * @param {number} equipo - ID del equipo al que pertenece el jugador.
     * @returns {Jugador} El jugador creado.
     */
    agregarJugador(nombre, posicion, nacimiento, equipo) {
        const jugador = new Jugador(
++jugadorIdCounter,
nombre,
posicion,
nacimiento,
equipo
);

        // Asegurarse de que el array jugadores está inicializado
        if (!jugadores) jugadores = [];
        jugadores.push(jugador);
        localStorage.setItem('jugadores', JSON.stringify(jugadores));
        console.log("Jugador añadido y guardado en localStorage:", jugador);
        return jugador;
    }

    /**
     * Obtiene todos los jugadores almacenados en el modelo.
     * @returns {Array} Lista de jugadores.
     */
    obtenerJugadores() {
        return jugadores;
    }

    /**
     * Agrega un nuevo equipo al modelo.
     * @param {string} nombre - Nombre del equipo.
     * @param {string} tla - Código TLA del equipo.
     * @param {string} crest - URL del escudo del equipo.
     * @param {string} website - Sitio web del equipo.
     * @param {number} founded - Año de fundación del equipo.
     * @param {string} clubColors - Colores del club.
     * @param {string} venue - Estadio del equipo.
     * @param {number} ligaId - ID de la liga.
     * @returns {Equipo} El equipo creado.
     */
    agregarEquipo(nombre, tla, crest, website, founded, clubColors, venue, ligaId) {
        const equipo = new Equipo(
            ++equipoIdCounter,
            nombre,
            tla,
            crest,
            website,
            founded,
            clubColors,
            venue,
            ligaId
        );

        // Ensure the equipos array is initialized
        if (!equipos) equipos = [];

        // Add the team to the array
        equipos.push(equipo);

        // Save the updated state to localStorage
        localStorage.setItem('equipos', JSON.stringify(equipos));

        console.log("Equipo añadido y guardado en localStorage:", equipo);
        return equipo;
    }

    /**
     * Obtiene todos los equipos almacenados en el modelo.
     * @returns {Array} Lista de equipos.
     */
    obtenerEquipos() {
        return equipos;
    }

    /**
     * Obtiene los equipos que pertenecen a una liga específica.
     * @param {number} leagueId - ID de la liga.
     * @returns {Array} Lista de equipos de la liga.
     */
    obtenerEquiposPorLiga(leagueId) {
        console.log("Liga seleccionada:", leagueId);
        console.log("Equipos disponibles:", equipos);
        return equipos.filter(equipo => equipo.ligaId === leagueId);
    }

    /**
     * Obtiene los jugadores que pertenecen a un equipo específico.
     * @param {number} teamId - ID del equipo.
     * @returns {Array} Lista de jugadores del equipo.
     */
    obtenerJugadoresPorEquipo(teamId) {
        return jugadores.filter(jugador => jugador.equipoId === teamId);
    }

    /**
     * Busca equipos por nombre.
     * @param {string} nombre - Nombre del equipo.
     * @returns {Array} Lista de equipos que coinciden con el nombre.
     */
    buscarEquipoPorNombre(nombre) {
        return equipos.filter(equipo => equipo.name.includes(nombre));
    }

    /**
     * Busca jugadores por nombre.
     * @param {string} nombre - Nombre del jugador.
     * @returns {Jugador} Jugador que coincide con el nombre.
     */
    buscarJugadorPorNombre(nombre) {
        return jugadores.find(jugador => jugador.name.includes(nombre));
    }

    /**
     * Asigna un jugador a un equipo.
     * @param {number} jugadorId - ID del jugador.
     * @param {number} equipoId - ID del equipo.
     * @throws {Error} Si el jugador o el equipo no existen.
     */
    asignarJugadorAEquipo(jugadorId, equipoId) {
        const jugador = jugadores.find(j => j.id === parseInt(jugadorId));
        if (!jugador) throw new Error("Jugador no encontrado.");
        const nuevoEquipo = equipos.find(e => e.id === parseInt(equipoId));
        if (!nuevoEquipo) throw new Error("Equipo no encontrado.");

        if (jugador.equipo) {
            const equipoAnterior = equipos.find(e => e.id === parseInt(jugador.equipo));
            if (equipoAnterior) {
                equipoAnterior.jugadores = equipoAnterior.jugadores.filter(j => j.id !== jugador.id);
            }
        }

        jugador.equipo = equipoId;

        if (!nuevoEquipo.jugadores) nuevoEquipo.jugadores = [];
        nuevoEquipo.jugadores.push(jugador);

        this.guardarEstado();
    }

    /**
     * Obtiene todos los datos de jugadores desde localStorage.
     * @returns {Array} Lista de jugadores.
     */
    obtenerDatosJugadores() {
        let jugadoresCompactos = [];
        let index = 0;
        while (localStorage.getItem(`jugadores_${index}`)) {
            jugadoresCompactos.push(...JSON.parse(localStorage.getItem(`jugadores_${index}`)));
            index++;
        }
        return jugadoresCompactos;
    }

    /**
     * Actualiza los datos de un jugador en localStorage.
     * @param {number} jugadorId - ID del jugador a actualizar.
     * @param {Object} nuevosDatos - Nuevos datos del jugador.
     */
    actualizarJugador(jugadorId, nuevosDatos) {
        const jugadoresCompactos = this.obtenerDatosJugadores();
        const jugadorIndex = jugadoresCompactos.findIndex(j => j.id === jugadorId);
        if (jugadorIndex === -1) throw new Error("Jugador no encontrado.");

        jugadoresCompactos[jugadorIndex] = { ...jugadoresCompactos[jugadorIndex], ...nuevosDatos };

        const fragmentSize = 100;
        for (let i = 0; i < jugadoresCompactos.length; i += fragmentSize) {
            localStorage.setItem(`jugadores_${i / fragmentSize}`, JSON.stringify(jugadoresCompactos.slice(i, i + fragmentSize)));
        }
    }

    /**
     * Obtiene todos los datos de equipos desde localStorage.
     * @returns {Array} Lista de equipos.
     */
    obtenerDatosEquipos() {
        return JSON.parse(localStorage.getItem('equipos')) || [];
    }

    /**
     * Actualiza los datos de un equipo en localStorage.
     * @param {number} equipoId - ID del equipo a actualizar.
     * @param {Object} nuevosDatos - Nuevos datos del equipo.
     */
    actualizarEquipo(equipoId, nuevosDatos) {
        const equipos = this.obtenerDatosEquipos();
        const equipoIndex = equipos.findIndex(e => e.id === equipoId);
        if (equipoIndex === -1) throw new Error("Equipo no encontrado.");

        equipos[equipoIndex] = { ...equipos[equipoIndex], ...nuevosDatos };

        localStorage.setItem('equipos', JSON.stringify(equipos));
    }

    /**
     * Obtiene todos los datos de ligas desde localStorage.
     * @returns {Array} Lista de ligas.
     */
    obtenerDatosLigas() {
        return JSON.parse(localStorage.getItem('ligas')) || [];
    }

    /**
     * Actualiza los datos de una liga en localStorage.
     * @param {number} ligaId - ID de la liga a actualizar.
     * @param {Object} nuevosDatos - Nuevos datos de la liga.
     */
    actualizarLiga(ligaId, nuevosDatos) {
        const ligas = this.obtenerDatosLigas();
        const ligaIndex = ligas.findIndex(l => l.id === ligaId);
        if (ligaIndex === -1) throw new Error("Liga no encontrada.");

        ligas[ligaIndex] = { ...ligas[ligaIndex], ...nuevosDatos };

        localStorage.setItem('ligas', JSON.stringify(ligas));
    }

    /**
     * Carga los datos iniciales en el modelo.
     * @param {Object} datos - Objeto que contiene los datos iniciales.
     * @param {Object} datos.competition - Objeto que representa la liga.
     * @param {Array} datos.teams - Lista de equipos de la liga.
     */
    static cargarDatosIniciales(datos) {
        if (!datos || typeof datos !== 'object') {
            console.error("Error: Los datos iniciales no son un objeto válido.", datos);
            return;
        }

        const { competition, teams } = datos;

        if (!competition || typeof competition !== 'object') {
            console.error("Error: 'competition' no es un objeto válido.", competition);
            return;
        }

        if (!Array.isArray(teams)) {
            console.error("Error: 'teams' no es un array válido.", teams);
            return;
        }

        const ligaProcesada = {
            id: competition.id,
            name: competition.name,
            code: competition.code,
            type: competition.type,
            emblem: competition.emblem,
            season: competition.season,
            equiposIds: teams.map(equipo => equipo.id)
        };

        const ligaIdPredefinido = competition.id;

        const equiposProcesados = teams.map(equipo => ({
            id: equipo.id,
            name: equipo.name,
            tla: equipo.tla,
            crest: equipo.crest || 'img/default-team.png',
            website: equipo.website,
            founded: equipo.founded,
            clubColors: equipo.clubColors,
            venue: equipo.venue,
            runningCompetitions: equipo.runningCompetitions || [],
            ligaId: ligaIdPredefinido
        }));

        const jugadoresProcesados = teams.flatMap(equipo =>
            Array.isArray(equipo.squad) ? equipo.squad.map(jugador => ({
                id: jugador.id,
                name: jugador.name,
                position: jugador.position,
                dateOfBirth: jugador.dateOfBirth,
                nationality: jugador.nationality,
                equipoId: equipo.id
            })) : []
        );

        ligas.push(ligaProcesada);
        equipos.push(...equiposProcesados);
        jugadores.push(...jugadoresProcesados);

        localStorage.setItem('ligas', JSON.stringify(ligas));
        localStorage.setItem('equipos', JSON.stringify(equipos));
        localStorage.setItem('jugadores', JSON.stringify(jugadores));

        console.log(`Datos iniciales de la liga '${competition.name}' procesados y cargados en el modelo.`);
    }

    /**
     * Elimina un equipo del modelo.
     * @param {number} equipoId - ID del equipo a eliminar.
     * @throws {Error} Si el equipo no existe.
     */
    eliminarEquipo(equipoId) {
        const equipoIndex = equipos.findIndex(equipo => equipo.id === parseInt(equipoId));
        if (equipoIndex === -1) {
            throw new Error("Equipo no encontrado.");
        }

        equipos.splice(equipoIndex, 1);

        localStorage.setItem('equipos', JSON.stringify(equipos));

        console.log(`Equipo con ID ${equipoId} eliminado correctamente.`);
    }
}

export default Model;