// Importar las clases de las entidades
import Jugador from './entidades/jugador.js';
import Equipo from './entidades/equipo.js';
import Partido from './entidades/partido.js';
import Copa from './entidades/copa.js'; // Nueva clase para competiciones tipo Copa
import Utils from '../utils.js'; // Importar las utilidades
import FootballDataApi from '../api/footballDataApi.js'; // Importar la API de datos de fútbol

// Contadores para asignar IDs únicos
let jugadorIdCounter = 0;
let equipoIdCounter = 0;
let partidoIdCounter = 0;
let copaIdCounter = 0;
let ligaIdCounter = 0; // Contador para ligas

// Arrays para almacenar los objetos
let jugadores = [];
let equipos = [];
let partidos = [];
let copas = []; // Array para almacenar las competiciones tipo Copa
let ligas = []; // Array para almacenar las ligas

// Clase modelo
const Model = {
    // Inicializar el modelo con datos
    inicializar: async function () {
        // Intentar cargar datos desde localStorage
        const estadoGuardado = Utils.cargarEstadoDesdeLocalStorage('estadoApp');
        if (estadoGuardado) {
            jugadores = estadoGuardado.jugadores.map(j => new Jugador(...Object.values(j)));
            equipos = estadoGuardado.equipos.map(e => new Equipo(...Object.values(e)));
            partidos = estadoGuardado.partidos.map(p => new Partido(...Object.values(p)));
            copas = estadoGuardado.copas.map(c => new Copa(...Object.values(c)));
            ligas = estadoGuardado.ligas.map(l => new Liga(...Object.values(l)));
            console.log("Datos cargados desde localStorage.");
        } else {
            // Si no hay datos en localStorage, cargar desde el archivo JSON
            const datosIniciales = await Utils.cargarDatosDesdeJSON('../datos_temporada2324.json');
            if (datosIniciales) {
                jugadores = datosIniciales.jugadores.map(j => new Jugador(...Object.values(j)));
                equipos = datosIniciales.equipos.map(e => new Equipo(...Object.values(e)));
                partidos = datosIniciales.partidos.map(p => new Partido(...Object.values(p)));
                copas = datosIniciales.copas.map(c => new Copa(...Object.values(c)));
                ligas = datosIniciales.ligas.map(l => new Liga(...Object.values(l)));
                console.log("Datos cargados desde el archivo JSON.");
            }
        }
    },

    // Guardar el estado actual en localStorage
    guardarEstado: function () {
        const estadoActual = { jugadores, equipos, partidos, copas, ligas };
        Utils.guardarEstadoEnLocalStorage('estadoApp', estadoActual);
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

    // Funciones para copas
    agregarCopa: function (nombre, temporada, equipos = []) {
        const copa = new Copa(++copaIdCounter, nombre, temporada, equipos);
        copas.push(copa);
        this.guardarEstado(); // Guardar el estado actualizado
        return copa;
    },

    obtenerCopas: function () {
        return copas;
    },

    agregarEquipoACopa: function (copaId, equipo) {
        const copa = copas.find(c => c.getId() === copaId);
        if (!copa) throw new Error("Copa no encontrada.");
        copa.agregarEquipo(equipo);
        this.guardarEstado(); // Guardar el estado actualizado
    },

    agregarPartidoACopa: function (copaId, partido) {
        const copa = copas.find(c => c.getId() === copaId);
        if (!copa) throw new Error("Copa no encontrada.");
        copa.agregarPartido(partido);
        this.guardarEstado(); // Guardar el estado actualizado
    },

    // Funciones para ligas
    agregarLiga: function (nombre, temporada, equipos) {
        const liga = new Liga(++ligaIdCounter, nombre, temporada, equipos);
        ligas.push(liga);
        this.guardarEstado(); // Guardar el estado actualizado
        return liga;
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

            // Obtener las ligas de los equipos participantes en la Champions League
            const ligasProcesadas = new Set();
            for (const equipo of equiposChampions) {
                const ligaId = equipo.area.id; // Usamos el área (país) como identificador de liga
                if (!ligasProcesadas.has(ligaId)) {
                    const datosLiga = await FootballDataApi.obtenerLiga(ligaId);
                    const equiposLiga = await FootballDataApi.obtenerEquipos(ligaId);
                    const partidosLiga = await FootballDataApi.obtenerPartidos(ligaId);

                    // Agregar la liga al modelo
                    const liga = this.agregarLiga(datosLiga.competition.name, datosLiga.season.startDate, equiposLiga);
                    partidosLiga.forEach(partido => {
                        this.agregarPartido(
                            partido.homeTeam.id,
                            partido.awayTeam.id,
                            null, // Estadio no disponible en la API
                            liga.getId(),
                            partido.utcDate
                        );
                    });

                    ligasProcesadas.add(ligaId);
                }
            }

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
        const plantilla = equipo.getPlantilla();
        const estadisticas = plantilla.reduce(
            (acc, jugador) => {
                const stats = jugador.getEstadisticas();
                acc.goles += stats.goles;
                acc.tarjetasAmarillas += stats.tarjetasAmarillas;
                acc.tarjetasRojas += stats.tarjetasRojas;
                return acc;
            },
            { goles: 0, tarjetasAmarillas: 0, tarjetasRojas: 0 }
        );
        return estadisticas;
    },

    obtenerEstadisticasJugador: function (jugadorId) {
        const jugador = jugadores.find(j => j.getId() === jugadorId);
        if (!jugador) throw new Error("Jugador no encontrado.");
        return jugador.getEstadisticas();
    },

    obtenerCalendario: function () {
        const partidosJugados = partidos.filter(p => p.jugado);
        const partidosPorJugar = partidos.filter(p => !p.jugado);
        return { partidosJugados, partidosPorJugar };
    }
};

export default Model;