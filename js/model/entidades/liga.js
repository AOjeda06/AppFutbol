/**
 * Clase Liga: Representa una liga de fútbol con sus detalles.
 */
class Liga {
    /**
     * Constructor: Inicializa los atributos de la liga.
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
}

export default Liga;