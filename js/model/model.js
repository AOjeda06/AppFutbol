// Importar las clases de las entidades
import Jugador from './entidades/jugador.js';
import Equipo from './entidades/equipo.js';

// Contadores para asignar IDs únicos
let jugadorIdCounter = 0;
let equipoIdCounter = 0;

// Arrays para almacenar los objetos
let jugadores = [];
let equipos = [];

// El objeto Model actúa como una capa de datos para la aplicación.
const Model = {
    // Objeto para almacenar los datos de equipos
    equipos: [],

    // Objeto para almacenar los datos de jugadores
    jugadores: [],

    /**
     * Inicializar el modelo con datos.
     * Carga los datos desde localStorage si están disponibles.
     */
    inicializar: async function () {
        const equiposGuardados = localStorage.getItem('equipos');
        const jugadoresGuardados = localStorage.getItem('jugadores');

        if (equiposGuardados && jugadoresGuardados) {
            equipos = JSON.parse(equiposGuardados);
            jugadores = JSON.parse(jugadoresGuardados);
            console.log("Datos cargados desde localStorage.");
        } else {
            console.log("No se encontraron datos en localStorage.");
        }
    },

    /**
     * Guarda el estado actual en localStorage.
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
     * Agrega un nuevo equipo al modelo.
     * @param {string} tipo - Tipo de equipo (e.g., club, selección).
     * @param {string} nombre - Nombre del equipo.
     * @param {string|null} ciudad - Ciudad del equipo.
     * @param {string|null} pais - País del equipo.
     * @returns {Equipo} El equipo creado.
     */
    agregarEquipo: function (tipo, nombre, ciudad = null, pais = null) {
        const equipo = new Equipo(
            ++equipoIdCounter,
            tipo,
            nombre,
            ciudad,
            pais
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
        jugador.setEquipoId(equipoId);
        equipo.agregarJugador(jugador);
        this.guardarEstado(); // Guardar el estado actualizado
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
    }
};

export default Model;