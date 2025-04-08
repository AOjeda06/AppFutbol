// Importar las clases de las entidades
import Jugador from './entidades/jugador.js';
import Equipo from './entidades/equipo.js';
import Liga from './entidades/liga.js';

// Contadores para asignar IDs únicos
let jugadorIdCounter = 0;
let equipoIdCounter = 0;

// Arrays para almacenar los objetos
let jugadores = [];
let equipos = [];
let ligas = []; // Array para almacenar las ligas

// El objeto Model actúa como una capa de datos para la aplicación.
export class Model {
    // Objeto para almacenar los datos de equipos
    equipos = [];

    // Objeto para almacenar los datos de jugadores
    jugadores = [];

    /**
     * Inicializar el modelo con datos.
     * Carga los datos desde localStorage si están disponibles.
     */
    async inicializar() {
        const jugadoresGuardados = localStorage.getItem('jugadores');

        if (jugadoresGuardados) {
            jugadores = JSON.parse(jugadoresGuardados);
            console.log("Datos de jugadores cargados desde localStorage.");
        } else {
            console.log("No se encontraron datos de jugadores en localStorage. Es posible que sea la primera ejecución.");
        }
    }

    /**
     * Guarda el estado actual en localStorage.
     */
    guardarEstado() {
        try {
            // Compactar datos de jugadores con nombres consistentes
            const jugadoresCompactos = (jugadores || []).map(jugador => ({
                id: jugador?.id || null,
                name: jugador?.name || null,
                dateOfBirth: jugador?.dateOfBirth || null,
                nationality: jugador?.nationality || null,
                equipoId: jugador?.equipoId || null // ID del equipo al que pertenece
            }));

            // Dividir jugadores en fragmentos más pequeños
            const fragmentSize = 100; // Tamaño del fragmento
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

        // Añadir el jugador al array
        jugadores.push(jugador);

        // Guardar el estado actualizado en localStorage
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
     * @param {string} ciudad - Ciudad del equipo.
     * @param {string} estadio - Estadio del equipo.
     * @returns {Equipo} El equipo creado.
     */
    agregarEquipo(nombre, ciudad, estadio) {
        const equipo = new Equipo(
            ++equipoIdCounter,
            nombre,
            ciudad,
            estadio
        );
        equipos.push(equipo);
        this.guardarEstado(); // Guardar el estado actualizado en localStorage
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

        // Eliminar al jugador de su equipo anterior, si tiene uno
        if (jugador.equipo) {
            const equipoAnterior = equipos.find(e => e.id === parseInt(jugador.equipo));
            if (equipoAnterior) {
                equipoAnterior.jugadores = equipoAnterior.jugadores.filter(j => j.id !== jugador.id);
            }
        }

        // Asignar el nuevo equipo al jugador
        jugador.equipo = equipoId;

        // Añadir al jugador al nuevo equipo
        if (!nuevoEquipo.jugadores) nuevoEquipo.jugadores = [];
        nuevoEquipo.jugadores.push(jugador);

        this.guardarEstado(); // Guardar el estado actualizado en localStorage
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

        // Actualizar los datos del jugador
        jugadoresCompactos[jugadorIndex] = { ...jugadoresCompactos[jugadorIndex], ...nuevosDatos };

        // Guardar los datos actualizados en fragmentos
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

        // Actualizar los datos del equipo
        equipos[equipoIndex] = { ...equipos[equipoIndex], ...nuevosDatos };

        // Guardar los datos actualizados
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

        // Actualizar los datos de la liga
        ligas[ligaIndex] = { ...ligas[ligaIndex], ...nuevosDatos };

        // Guardar los datos actualizados
        localStorage.setItem('ligas', JSON.stringify(ligas));
    }

    /**
     * Agrega una nueva liga al modelo.
     * @param {Object} liga - Objeto con los datos de la liga.
     * @returns {Liga} La liga creada.
     */
    agregarLiga(liga) {
        const nuevaLiga = {
            id: liga.id,
            name: liga.name,
            code: liga.code,
            type: liga.type,
            emblem: liga.emblem,
            season: liga.season,
            equiposIds: liga.teams.map(equipo => equipo.id) // Relación con equipos por ID
        };

        ligas.push(nuevaLiga);
        localStorage.setItem('ligas', JSON.stringify(ligas));
        console.log("Liga añadida y guardada en localStorage:", nuevaLiga);
        return nuevaLiga;
    }

    /**
     * Obtiene todas las ligas almacenadas en el modelo.
     * @returns {Array} Lista de ligas.
     */
    obtenerLigas() {
        return ligas;
    }

    /**
     * Relaciona una liga con sus equipos.
     * @param {number} ligaId - ID de la liga.
     * @returns {Object} Liga con los equipos relacionados.
     */
    obtenerLigaConEquipos(ligaId) {
        const liga = ligas.find(l => l.id === ligaId);
        if (!liga) throw new Error("Liga no encontrada.");

        const equiposRelacionados = liga.equiposIds.map(equipoId =>
            equipos.find(e => e.id === equipoId)
        );

        return { ...liga, equipos: equiposRelacionados };
    }

    /**
     * Carga los datos iniciales en el modelo.
     * @param {Object} datos - Objeto que contiene los datos iniciales.
     * @param {Array} datos.ligas - Lista de ligas.
     * @param {Array} datos.equipos - Lista de equipos.
     */
    static cargarDatosIniciales({ ligas: ligasNuevas = [], equipos: equiposNuevos = [] }) {
        // Validar que los datos de ligas y equipos sean arrays
        if (!Array.isArray(ligasNuevas) || !Array.isArray(equiposNuevos)) {
            console.error("Datos iniciales inválidos: 'ligas' o 'equipos' no son arrays.");
            return;
        }

        // Procesar equipos
        const equiposProcesados = equiposNuevos.map(equipo => ({
            id: equipo.id,
            name: equipo.name,
            shortName: equipo.shortName,
            tla: equipo.tla,
            crest: equipo.crest,
            address: equipo.address,
            website: equipo.website,
            founded: equipo.founded,
            clubColors: equipo.clubColors,
            venue: equipo.venue,
            runningCompetitions: equipo.runningCompetitions || []
        }));

        // Procesar ligas
        const ligasProcesadas = ligasNuevas.map(liga => ({
            id: liga.id,
            name: liga.name,
            code: liga.code,
            type: liga.type,
            emblem: liga.emblem,
            season: liga.season,
            equiposIds: Array.isArray(liga.teams) ? liga.teams.map(equipo => equipo.id) : [] // Validar que 'teams' sea un array
        }));

        // Guardar en el modelo
        equipos = equiposProcesados;
        ligas = ligasProcesadas;

        // Guardar en localStorage
        localStorage.setItem('equipos', JSON.stringify(equipos));
        localStorage.setItem('ligas', JSON.stringify(ligas));

        console.log("Datos iniciales de ligas y equipos procesados y cargados en el modelo.");
    }
}

export default Model;