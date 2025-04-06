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
     * @param {Array} teams - Equipos participantes en la liga.
     */
    constructor(id, name, code, type, emblem, season, teams = []) {
        this.id = id;
        this.name = name;
        this.code = code;
        this.type = type;
        this.emblem = emblem;
        this.season = season; // Objeto con detalles de la temporada
        this.teams = teams; // Lista de equipos participantes
    }

    // Métodos para acceder a los atributos de la liga.
    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getCode() {
        return this.code;
    }

    getType() {
        return this.type;
    }

    getEmblem() {
        return this.emblem;
    }

    getSeason() {
        return this.season;
    }

    getTeams() {
        return this.teams;
    }

    /**
     * Método para agregar un equipo a la liga.
     * @param {Object} team - Objeto equipo a agregar.
     */
    addTeam(team) {
        this.teams.push(team);
    }
}

export default Liga;