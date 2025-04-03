/**
 * Clase Partido: Representa un partido de fútbol con sus detalles.
 */
class Partido {
    _id; // ID único del partido.
    _fechaHora; // Fecha y hora del partido.
    _estadio; // Información del estadio (nombre, ciudad).
    _estado; // Estado del partido (ej. en curso, finalizado).
    _equipos; // Equipos que participan en el partido (local y visitante).
    _goles; // Goles anotados por cada equipo.
    _marcador; // Detalles del marcador (mitad, tiempo completo, etc.).

    /**
     * Constructor: Inicializa los atributos del partido.
     * @param {number} id - ID único del partido.
     * @param {string} fechaHora - Fecha y hora del partido.
     * @param {Object} estadio - Información del estadio.
     * @param {Object} estado - Estado del partido.
     * @param {Object} equipos - Equipos participantes.
     * @param {Object} goles - Goles anotados.
     * @param {Object} marcador - Detalles del marcador.
     */
    constructor(id, fechaHora, estadio, estado, equipos, goles, marcador) {
        this._id = id;
        this._fechaHora = fechaHora;
        this._estadio = estadio; // { nombre, ciudad }
        this._estado = estado; // { long, short, elapsed }
        this._equipos = equipos; // { home: { id, name, logo, winner }, away: { id, name, logo, winner } }
        this._goles = goles; // { home, away }
        this._marcador = marcador; // { halftime, fulltime, extratime, penalty }
    }

    // Métodos para acceder a los atributos del partido.
    getId() {
        return this._id;
    }

    getFechaHora() {
        return this._fechaHora;
    }

    getEstadio() {
        return this._estadio;
    }

    getEstado() {
        return this._estado;
    }

    getEquipos() {
        return this._equipos;
    }

    getGoles() {
        return this._goles;
    }

    getMarcador() {
        return this._marcador;
    }
}

export default Partido;