class Equipo {
    constructor(id, tipo, nombre, ciudad = null, pais = null, estadioId = null, plantilla = [], estadisticas = {}, logo = null) {
        this._id = id;
        this._tipo = tipo;
        this._nombre = nombre;
        this._ciudad = ciudad;
        this._pais = pais;
        this._estadioId = estadioId;
        this._plantilla = plantilla;
        this._estadisticas = {
            ganados: estadisticas.ganados || 0,
            perdidos: estadisticas.perdidos || 0,
            empatados: estadisticas.empatados || 0,
            golesFavor: estadisticas.golesFavor || 0,
            golesContra: estadisticas.golesContra || 0
        };
        this._logo = logo;
    }

    getId() {
        return this._id;
    }

    getNombre() {
        return this._nombre;
    }

    getLogo() {
        return this._logo;
    }

    getPais() {
        return this._pais;
    }

    getPlantilla() {
        return this._plantilla;
    }

    agregarJugador(jugador) {
        this._plantilla.push(jugador);
    }

    getEstadisticas() {
        return this._estadisticas;
    }

    actualizarEstadisticas(nuevasEstadisticas) {
        this._estadisticas.ganados += nuevasEstadisticas.ganados || 0;
        this._estadisticas.perdidos += nuevasEstadisticas.perdidos || 0;
        this._estadisticas.empatados += nuevasEstadisticas.empatados || 0;
        this._estadisticas.golesFavor += nuevasEstadisticas.golesFavor || 0;
        this._estadisticas.golesContra += nuevasEstadisticas.golesContra || 0;
    }
}

export default Equipo;