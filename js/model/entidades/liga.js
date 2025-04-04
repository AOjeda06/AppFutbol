/**
 * Clase Liga: Representa una liga de fútbol con sus detalles.
 */
class Liga {
    /**
     * Constructor: Inicializa los atributos de la liga.
     * @param {number} id - ID único de la liga.
     * @param {string} nombre - Nombre de la liga.
     * @param {Array} equipos - Equipos participantes.
     */
    constructor(id, nombre, equipos = []) {
        this._id = id;
        this._nombre = nombre;
        this._equipos = equipos;
        this._pais = null; // País al que pertenece la liga
        this._logo = null; // URL del logo de la liga
        this._bandera = null; // URL de la bandera del país
        this._temporadas = []; // Array de temporadas disponibles
    }

    // Métodos para acceder a los atributos de la liga.
    getId() {
        return this._id;
    }

    getNombre() {
        return this._nombre;
    }

    getPais() {
        return this._pais;
    }

    getLogo() {
        return this._logo;
    }

    getBandera() {
        return this._bandera;
    }

    getTemporadas() {
        return this._temporadas;
    }

    /**
     * Método para establecer las temporadas disponibles.
     * @param {Array} temporadas - Array de temporadas.
     */
    setTemporadas(temporadas) {
        this._temporadas = temporadas;
    }

    /**
     * Método para agregar un equipo a la liga.
     * @param {Object} equipo - Objeto equipo a agregar.
     */
    agregarEquipo(equipo) {
        this._equipos.push(equipo);
    }

    /**
     * Método para obtener los equipos de la liga.
     * @returns {Array} Lista de equipos en la liga.
     */
    getEquipos() {
        return this._equipos;
    }

    /**
     * Método para calcular estadísticas de la liga.
     * @returns {Object} Estadísticas agregadas de la liga.
     */
    calcularEstadisticas() {
        const estadisticas = {
            totalEquipos: this._equipos.length,
            totalGolesFavor: 0,
            totalGolesContra: 0,
            totalPartidos: 0,
        };

        this._equipos.forEach(equipo => {
            const equipoStats = equipo.getEstadisticas();
            estadisticas.totalGolesFavor += equipoStats.golesFavor;
            estadisticas.totalGolesContra += equipoStats.golesContra;
            estadisticas.totalPartidos += equipoStats.ganados + equipoStats.perdidos + equipoStats.empatados;
        });

        return estadisticas;
    }
}

export default Liga;