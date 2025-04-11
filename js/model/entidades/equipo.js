let equipoIdCounter = 200000; // Auto-generated ID starting from 200000

/**
 * Clase Equipo: Representa un equipo de fútbol con sus detalles esenciales.
 */
class Equipo {
    /**
     * Constructor: Inicializa los atributos del equipo.
     * 
     * @param {number} id - ID del equipo.
     * @param {string} name - Nombre del equipo.
     * @param {string} tla - Abreviatura del equipo.
     * @param {string} crest - URL del escudo del equipo.
     * @param {string} website - Sitio web del equipo.
     * @param {number} founded - Año de fundación del equipo.
     * @param {string} clubColors - Colores del club.
     * @param {string} venue - Nombre del estadio.
     * @param {Array} runningCompetitions - Competencias en las que participa el equipo.
     * @param {number} ligaId - ID de la liga a la que pertenece el equipo.
     */
    constructor(
        id,
        name,
        tla,
        crest,
        website,
        founded,
        clubColors,
        venue,
        runningCompetitions = [],
        ligaId = null
    ) {
        this.id = id || equipoIdCounter++; // Genera un ID automáticamente si no se proporciona.
        this.name = name;
        this.tla = tla;
        this.crest = crest;
        this.website = website;
        this.founded = founded;
        this.clubColors = clubColors;
        this.venue = venue;
        this.runningCompetitions = runningCompetitions;
        this.ligaId = ligaId; // Relación con la liga.
    }

    /**
     * Devuelve el ID del equipo.
     * @returns {number} ID del equipo.
     */
    getId() {
        return this.id;
    }

    /**
     * Devuelve el nombre del equipo.
     * @returns {string} Nombre del equipo.
     */
    getName() {
        return this.name;
    }

    /**
     * Devuelve la abreviatura del equipo.
     * @returns {string} Abreviatura del equipo.
     */
    getTla() {
        return this.tla;
    }

    /**
     * Devuelve la URL del escudo del equipo.
     * @returns {string} URL del escudo.
     */
    getCrest() {
        return this.crest;
    }

    /**
     * Devuelve el sitio web del equipo.
     * @returns {string} Sitio web del equipo.
     */
    getWebsite() {
        return this.website;
    }

    /**
     * Devuelve el año de fundación del equipo.
     * @returns {number} Año de fundación.
     */
    getFounded() {
        return this.founded;
    }

    /**
     * Devuelve los colores del club.
     * @returns {string} Colores del club.
     */
    getClubColors() {
        return this.clubColors;
    }

    /**
     * Devuelve el nombre del estadio del equipo.
     * @returns {string} Nombre del estadio.
     */
    getVenue() {
        return this.venue;
    }

    /**
     * Devuelve las competencias en las que participa el equipo.
     * @returns {Array} Competencias en las que participa.
     */
    getRunningCompetitions() {
        return this.runningCompetitions;
    }

    /**
     * Devuelve el ID de la liga a la que pertenece el equipo.
     * @returns {number} ID de la liga.
     */
    getLigaId() {
        return this.ligaId;
    }
}

export default Equipo;