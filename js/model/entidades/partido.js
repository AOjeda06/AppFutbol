class Partido {
    _id;
    _fechaHora;
    _estadio;
    _estado;
    _equipos;
    _goles;
    _marcador;

    constructor(id, fechaHora, estadio, estado, equipos, goles, marcador) {
        this._id = id;
        this._fechaHora = fechaHora;
        this._estadio = estadio; // { nombre, ciudad }
        this._estado = estado; // { long, short, elapsed }
        this._equipos = equipos; // { home: { id, name, logo, winner }, away: { id, name, logo, winner } }
        this._goles = goles; // { home, away }
        this._marcador = marcador; // { halftime, fulltime, extratime, penalty }
    }

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