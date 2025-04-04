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
            // Compactar datos
            const equiposCompactos = (equipos || []).map(equipo => ({
                idTeam: equipo?.idTeam || null,
                strTeam: equipo?.strTeam || null,
                strLeague: equipo?.strLeague || null
            }));

            const jugadoresCompactos = (jugadores || []).map(jugador => ({
                idPlayer: jugador?.idPlayer || null,
                strPlayer: jugador?.strPlayer || null,
                dateBorn: jugador?.dateBorn || null,
                strNationality: jugador?.strNationality || null
            }));

            const ligasCompactas = (ligas || []).map(({ id, nombre, equipos }) => ({
                id,
                nombre,
                equipos: (equipos || []).map(e => e?.idTeam || null)
            }));

            // Dividir jugadores en fragmentos más pequeños
            const fragmentSize = 100; // Tamaño del fragmento
            for (let i = 0; i < jugadoresCompactos.length; i += fragmentSize) {
                localStorage.setItem(`jugadores_${i / fragmentSize}`, JSON.stringify(jugadoresCompactos.slice(i, i + fragmentSize)));
            }

            // Guardar equipos y ligas
            localStorage.setItem('equipos', JSON.stringify(equiposCompactos));
            localStorage.setItem('ligas', JSON.stringify(ligasCompactas));
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

        // Reconstruir jugadores desde fragmentos
        jugadores = [];
        let index = 0;
        while (localStorage.getItem(`jugadores_${index}`)) {
            jugadores.push(...JSON.parse(localStorage.getItem(`jugadores_${index}`)));
            index++;
        }

        // Reconstruir ligas
        const ligasGuardadas = JSON.parse(localStorage.getItem('ligas')) || [];
        ligas = ligasGuardadas.map(ligaData => {
            const equiposLiga = equipos.filter(e => ligaData.equipos.includes(e.idTeam));
            return new Liga(ligaData.id, ligaData.nombre, equiposLiga);
        });

        this.guardarEstado(); // Guardar el estado actualizado
        console.log("Datos iniciales cargados en el modelo.");
    },

    /**
     * Crear ligas a partir de los equipos.
     */
    crearLigas: function () {
        const ligasMap = new Map();
        const ligasPermitidas = [
            "UEFA Champions League",
            "English Premier League",
            "Spanish La Liga",
            "Italian Serie A",
            "German Bundesliga"
        ];

        // Crear las ligas permitidas vacías
        ligasPermitidas.forEach((ligaNombre, index) => {
            ligasMap.set(ligaNombre, new Liga(index + 1, ligaNombre, []));
        });

        // Clasificar equipos por strLeague y strLeague1 a strLeague10
        const equiposPorLiga = equipos.reduce((clasificacion, equipo) => {
            let ligaAsignada = equipo.strLeague; // Liga nacional principal

            // Comprobar strLeague1 a strLeague10 para la Champions League
            for (let i = 1; i <= 10; i++) {
                const leagueKey = `strLeague${i}`;
                if (equipo[leagueKey] === "UEFA Champions League") {
                    ligaAsignada = "UEFA Champions League"; // Asignar temporalmente para clasificación
                    break;
                }
            }

            if (ligasPermitidas.includes(ligaAsignada)) {
                if (!clasificacion[ligaAsignada]) {
                    clasificacion[ligaAsignada] = [];
                }
                clasificacion[ligaAsignada].push(equipo);
            }
            return clasificacion;
        }, {});

        // Asignar equipos clasificados a las ligas correspondientes
        Object.entries(equiposPorLiga).forEach(([ligaNombre, equiposLiga]) => {
            if (ligasMap.has(ligaNombre)) {
                equiposLiga.forEach(equipo => ligasMap.get(ligaNombre).agregarEquipo(equipo));
            }
        });

        // Convertir el mapa a un array
        ligas = Array.from(ligasMap.values());
        this.guardarEstado();
        console.log("Ligas creadas y guardadas en el modelo.");
    }
};

export default Model;