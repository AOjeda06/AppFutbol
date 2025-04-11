/**
 * Clase Liga: Representa una liga de fútbol con sus detalles.
 */
class Liga {
    /**
     * Constructor: Inicializa los atributos de la liga.
     * 
     * @param {number} id - ID único de la liga.
     * @param {string} name - Nombre de la liga.
     * @param {string} code - Código de la liga.
     * @param {string} type - Tipo de la liga (e.g., LEAGUE, CUP).
     * @param {string} emblem - URL del emblema de la liga.
     * @param {Object} season - Detalles de la temporada actual.
     */
    constructor(id, name, code, type, emblem, season) {
        this.id = id;
        this.name = name;
        this.code = code;
        this.type = type;
        this.emblem = emblem;
        this.season = season; // Objeto con detalles de la temporada
    }

    /**
     * Devuelve el ID único de la liga.
     * @returns {number} ID de la liga.
     */
    getId() {
        return this.id;
    }

    /**
     * Devuelve el nombre de la liga.
     * @returns {string} Nombre de la liga.
     */
    getName() {
        return this.name;
    }

    /**
     * Devuelve el código de la liga.
     * @returns {string} Código de la liga.
     */
    getCode() {
        return this.code;
    }

    /**
     * Devuelve el tipo de la liga.
     * @returns {string} Tipo de la liga.
     */
    getType() {
        return this.type;
    }

    /**
     * Devuelve la URL del emblema de la liga.
     * @returns {string} URL del emblema.
     */
    getEmblem() {
        return this.emblem;
    }

    /**
     * Devuelve los detalles de la temporada actual de la liga.
     * @returns {Object} Detalles de la temporada actual.
     */
    getSeason() {
        return this.season;
    }
}

export default Liga;