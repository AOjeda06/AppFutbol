/**
 * Clase Equipo: Representa un equipo de fútbol con sus detalles.
 */
class Equipo {
    /**
     * Constructor: Inicializa los atributos del equipo.
     * @param {number} id - ID único del equipo.
     * @param {string} tipo - Tipo de equipo (ej. club, selección).
     * @param {string} nombre - Nombre del equipo.
     * @param {string|null} ciudad - Ciudad del equipo (opcional).
     * @param {string|null} pais - País del equipo (opcional).
     * @param {number|null} estadioId - ID del estadio del equipo (opcional).
     * @param {Array} plantilla - Lista de jugadores del equipo.
     * @param {Object} estadisticas - Estadísticas del equipo.
     * @param {string|null} logo - URL del logo del equipo (opcional).
     */
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

    // Métodos para acceder a los atributos del equipo.
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

    /**
     * Método para agregar un jugador a la plantilla del equipo.
     * @param {Object} jugador - Objeto jugador a agregar.
     */
    agregarJugador(jugador) {
        this._plantilla.push(jugador);
    }

    /**
     * Método para obtener las estadísticas del equipo.
     * @returns {Object} Estadísticas del equipo.
     */
    getEstadisticas() {
        return this._estadisticas;
    }

    /**
     * Método para actualizar las estadísticas del equipo.
     * @param {Object} nuevasEstadisticas - Nuevas estadísticas a agregar.
     */
    actualizarEstadisticas(nuevasEstadisticas) {
        this._estadisticas.ganados += nuevasEstadisticas.ganados || 0;
        this._estadisticas.perdidos += nuevasEstadisticas.perdidos || 0;
        this._estadisticas.empatados += nuevasEstadisticas.empatados || 0;
        this._estadisticas.golesFavor += nuevasEstadisticas.golesFavor || 0;
        this._estadisticas.golesContra += nuevasEstadisticas.golesContra || 0;
    }
}

export default Equipo;