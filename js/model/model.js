// Importar las clases de las entidades
import Jugador from './entidades/jugador.js';
import Equipo from './entidades/equipo.js';
import Partido from './entidades/partido.js';
// Eliminamos la importación de Utils
// import Utils from '../utils.js'; 
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

// Clase modelo
const Model = {
    // Inicializar el modelo con datos
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
    },

    // Guardar el estado actual en localStorage
    guardarEstado: function () {
        localStorage.setItem('equipos', JSON.stringify(equipos));
        localStorage.setItem('jugadores', JSON.stringify(jugadores));
        console.log("Estado guardado en localStorage.");
    },

    // Funciones para jugadores
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

    obtenerJugadores: function () {
        return jugadores;
    },

    asignarJugadorAEquipo: function (jugadorId, equipoId) {
        const jugador = jugadores.find(j => j.getId() === jugadorId);
        if (!jugador) throw new Error("Jugador no encontrado.");
        const equipo = equipos.find(e => e.getId() === equipoId);
        if (!equipo) throw new Error("Equipo no encontrado.");
        jugador.equipoId = equipoId;
        equipo.agregarJugador(jugador);
        this.guardarEstado(); // Guardar el estado actualizado
    },

    // Funciones para equipos
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

    obtenerEquipos: function () {
        return equipos;
    },

    // Funciones para partidos
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

    obtenerPartidos: function () {
        return partidos;
    },

    // Funciones para ligas
    agregarLiga: function (nombre, temporada, equipos) {
        const liga = new Liga(++ligaIdCounter, nombre, temporada, equipos);
        ligas.push(liga);
        this.guardarEstado(); // Guardar el estado actualizado
        return liga;
    },

    // Método para cargar datos iniciales
    cargarDatosIniciales: function ({ equipos: equiposNuevos, jugadores: jugadoresNuevos }) {
        equipos = equiposNuevos;
        jugadores = jugadoresNuevos;

        this.guardarEstado(); // Guardar el estado actualizado
        console.log("Datos iniciales cargados en el modelo.");
    },

    // Cargar datos desde la API
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
    },

    // Funciones para estadísticas
    obtenerJugadoresPorEquipo: function (equipoId) {
        return jugadores.filter(j => j.getEquipoId() === equipoId);
    },

    obtenerJugadoresPorPosicion: function () {
        return jugadores.sort((a, b) => a.getPosicion().localeCompare(b.getPosicion()));
    },

    obtenerEstadisticasEquipo: function (equipoId) {
        const equipo = equipos.find(e => e.getId() === equipoId);
        if (!equipo) throw new Error("Equipo no encontrado.");
        return equipo.getEstadisticas();
    },

    obtenerCalendario: function () {
        const partidosJugados = partidos.filter(p => p.jugado);
        const partidosPorJugar = partidos.filter(p => !p.jugado);
        return { partidosJugados, partidosPorJugar };
    }
};

export default Model;