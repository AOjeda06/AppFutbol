// Importar las clases de las entidades
import Jugador from './entidades/jugador.js';
import Equipo from './entidades/equipo.js';
import Partido from './entidades/partido.js';
import FootballDataApi from '../api/footballDataApi.js'; // Importar la API de datos de fútbol

// Contadores para asignar IDs únicos
let jugadorIdCounter = 0;
let equipoIdCounter = 0;
let partidoIdCounter = 0;
let ligaIdCounter = 0; // Contador para ligas

// Arrays para almacenar los objetos
let jugadores = [];
let equipos = [];
let partidos = [];
let ligas = []; // Array para almacenar las ligas

// El objeto Model actúa como una capa de datos para la aplicación.
// Se encarga de almacenar y gestionar los datos de equipos y jugadores.
const Model = {
    // Objeto para almacenar los datos de equipos
    equipos: [],

    // Objeto para almacenar los datos de jugadores
    jugadores: [],

    /**
     * Inicializar el modelo con datos.
     * Carga los datos desde localStorage si están disponibles, de lo contrario, se deben obtener desde la API.
     */
    inicializar: async function () {
        const equiposGuardados = localStorage.getItem('equipos');
        const jugadoresGuardados = localStorage.getItem('jugadores');

        if (equiposGuardados && jugadoresGuardados) {
            equipos = JSON.parse(equiposGuardados);
            jugadores = JSON.parse(jugadoresGuardados);
            console.log("Datos cargados desde localStorage.");
        } else {
            console.log("No se encontraron datos en localStorage. Se deben obtener desde la API.");
        }
    }, // Corregido: cierre correcto de la función 'inicializar'

    /**
     * Guarda el estado actual en localStorage.
     * Serializa los datos de equipos y jugadores y los almacena en localStorage.
     */
    guardarEstado: function () {
        try {
            localStorage.setItem('equipos', JSON.stringify(equipos));
            localStorage.setItem('jugadores', JSON.stringify(jugadores));
            console.log("Estado guardado en localStorage.");
        } catch (error) {
            if (error.name === "QuotaExceededError") {
                console.warn("Error: No se pudo guardar el estado en localStorage debido a la cuota excedida.");
            } else {
                throw error;
            }
        }
    },

    /**
     * Agrega un nuevo jugador al modelo.
     * @param {string} nombre - Nombre del jugador.
     * @param {string} apellidos - Apellidos del jugador.
     * @param {string} apodo - Apodo del jugador.
     * @param {string} posicion - Posición del jugador.
     * @param {number} numero - Número del jugador.
     * @param {number} anioNacimiento - Año de nacimiento del jugador.
     * @param {number} equipoId - ID del equipo al que pertenece el jugador.
     * @returns {Jugador} El jugador creado.
     */
    agregarJugador: function (nombre, apellidos, apodo, posicion, numero, anioNacimiento, equipoId) {
        const jugador = new Jugador(
            ++jugadorIdCounter,
            nombre,
            apellidos,
            apodo,
            posicion,
            numero,
            anioNacimiento,
            equipoId
        );
        jugadores.push(jugador);
        this.guardarEstado(); // Guardar el estado actualizado
        return jugador;
    },

    /**
     * Obtiene todos los jugadores almacenados en el modelo.
     * @returns {Array} Lista de jugadores.
     */
    obtenerJugadores: function () {
        return jugadores;
    },

    /**
     * Asigna un jugador a un equipo.
     * @param {number} jugadorId - ID del jugador.
     * @param {number} equipoId - ID del equipo.
     * @throws {Error} Si el jugador o el equipo no existen.
     */
    asignarJugadorAEquipo: function (jugadorId, equipoId) {
        const jugador = jugadores.find(j => j.getId() === jugadorId);
        if (!jugador) throw new Error("Jugador no encontrado.");
        const equipo = equipos.find(e => e.getId() === equipoId);
        if (!equipo) throw new Error("Equipo no encontrado.");
        jugador.equipoId = equipoId;
        equipo.agregarJugador(jugador);
        this.guardarEstado(); // Guardar el estado actualizado
    },

    /**
     * Agrega un nuevo equipo al modelo.
     * @param {string} tipo - Tipo de equipo (e.g., club, selección).
     * @param {string} nombre - Nombre del equipo.
     * @param {string|null} ciudad - Ciudad del equipo.
     * @param {string|null} pais - País del equipo.
     * @param {number|null} estadioId - ID del estadio del equipo.
     * @param {string|null} entrenador - Entrenador del equipo.
     * @returns {Equipo} El equipo creado.
     */
    agregarEquipo: function (tipo, nombre, ciudad = null, pais = null, estadioId = null, entrenador = null) {
        const equipo = new Equipo(
            ++equipoIdCounter,
            tipo,
            nombre,
            ciudad,
            pais,
            estadioId,
            entrenador
        );
        equipos.push(equipo);
        this.guardarEstado(); // Guardar el estado actualizado
        return equipo;
    },

    /**
     * Obtiene todos los equipos almacenados en el modelo.
     * @returns {Array} Lista de equipos.
     */
    obtenerEquipos: function () {
        return equipos;
    },

    /**
     * Agrega un nuevo partido al modelo.
     * @param {number} equipoLocalId - ID del equipo local.
     * @param {number} equipoVisitanteId - ID del equipo visitante.
     * @param {number|null} estadioId - ID del estadio donde se jugará el partido.
     * @param {number} competicionId - ID de la competición.
     * @param {string} fechaHora - Fecha y hora del partido.
     * @returns {Partido} El partido creado.
     */
    agregarPartido: function (equipoLocalId, equipoVisitanteId, estadioId, competicionId, fechaHora) {
        const partido = new Partido(
            ++partidoIdCounter,
            equipoLocalId,
            equipoVisitanteId,
            estadioId,
            competicionId,
            fechaHora
        );
        partidos.push(partido);
        this.guardarEstado(); // Guardar el estado actualizado
        return partido;
    },

    /**
     * Obtiene todos los partidos almacenados en el modelo.
     * @returns {Array} Lista de partidos.
     */
    obtenerPartidos: function () {
        return partidos;
    },

    /**
     * Agrega una nueva liga al modelo.
     * @param {string} nombre - Nombre de la liga.
     * @param {string} temporada - Temporada de la liga.
     * @param {Array} equipos - Lista de equipos que participan en la liga.
     * @returns {Liga} La liga creada.
     */
    agregarLiga: function (nombre, temporada, equipos) {
        const liga = new Liga(++ligaIdCounter, nombre, temporada, equipos);
        ligas.push(liga);
        this.guardarEstado(); // Guardar el estado actualizado
        return liga;
    },

    /**
     * Carga los datos iniciales en el modelo.
     * @param {Object} datos - Objeto que contiene los datos iniciales.
     * @param {Array} datos.equipos - Lista de equipos.
     * @param {Array} datos.jugadores - Lista de jugadores.
     */
    cargarDatosIniciales: function ({ equipos: equiposNuevos, jugadores: jugadoresNuevos }) {
        equipos = equiposNuevos;
        jugadores = jugadoresNuevos;

        this.guardarEstado(); // Guardar el estado actualizado
        console.log("Datos iniciales cargados en el modelo.");
    },

    /**
     * Carga los datos desde la API de FootballData.
     * Obtiene los equipos y partidos de las competiciones principales y los almacena en el modelo.
     */
    cargarDatosDesdeAPI: async function () {
        try {
            // IDs de las competiciones principales
            const ligasIds = {
                premierLeague: 'PL',
                laLiga: 'PD',
                serieA: 'SA',
                bundesliga: 'BL1',
                ligue1: 'FL1',
                championsLeague: 'CL'
            };

            // Cargar datos de la Champions League primero
            const equiposChampions = await FootballDataApi.obtenerEquipos(ligasIds.championsLeague);
            const partidosChampions = await FootballDataApi.obtenerPartidos(ligasIds.championsLeague);

            // Agregar la Champions League como competición
            const championsLeague = this.agregarLiga('Champions League', '2023/2024', equiposChampions);
            partidosChampions.forEach(partido => {
                this.agregarPartido(
                    partido.homeTeam.id,
                    partido.awayTeam.id,
                    null, // Estadio no disponible en la API
                    championsLeague.getId(),
                    partido.utcDate
                );
            });

            // Guardar el estado actualizado en localStorage
            this.guardarEstado();

            console.log('Datos cargados desde la API, incluyendo todas las ligas necesarias.');
        } catch (error) {
            console.error('Error al cargar datos desde la API:', error);
        }
    }, // Corregido: cierre correcto de la función 'cargarDatosDesdeAPI'

    /**
     * Obtiene los jugadores de un equipo específico.
     * @param {number} equipoId - ID del equipo.
     * @returns {Array} Lista de jugadores del equipo.
     */
    obtenerJugadoresPorEquipo: function (equipoId) {
        return jugadores.filter(j => j.getEquipoId() === equipoId);
    },

    /**
     * Obtiene los jugadores ordenados por posición.
     * @returns {Array} Lista de jugadores ordenados por posición.
     */
    obtenerJugadoresPorPosicion: function () {
        return jugadores.sort((a, b) => a.getPosicion().localeCompare(b.getPosicion()));
    },

    /**
     * Obtiene las estadísticas de un equipo específico.
     * @param {number} equipoId - ID del equipo.
     * @returns {Object} Estadísticas del equipo.
     * @throws {Error} Si el equipo no existe.
     */
    obtenerEstadisticasEquipo: function (equipoId) {
        const equipo = equipos.find(e => e.getId() === equipoId);
        if (!equipo) throw new Error("Equipo no encontrado.");
        return equipo.getEstadisticas();
    },

    /**
     * Obtiene el calendario de partidos.
     * Divide los partidos en jugados y por jugar.
     * @returns {Object} Objeto con los partidos jugados y por jugar.
     */
    obtenerCalendario: function () {
        const partidosJugados = partidos.filter(p => p.jugado);
        const partidosPorJugar = partidos.filter(p => !p.jugado);
        return { partidosJugados, partidosPorJugar };
    },

    /**
     * Busca un equipo por su ID.
     * @param {number} id - ID del equipo a buscar.
     * @returns {Object|null} El equipo encontrado o null si no existe.
     */
    buscarEquipoPorId: function (id) {
        return this.equipos.find(equipo => equipo.id === id) || null;
    },

    /**
     * Busca un jugador por su ID.
     * @param {number} id - ID del jugador a buscar.
     * @returns {Object|null} El jugador encontrado o null si no existe.
     */
    buscarJugadorPorId: function (id) {
        return this.jugadores.find(jugador => jugador.id === id) || null;
    }
};

export default Model;