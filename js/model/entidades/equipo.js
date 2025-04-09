let equipoIdCounter = 200000; // Auto-generated ID starting from 200000

/**
 * Clase Equipo: Representa un equipo de fútbol con sus detalles esenciales.
 */
class Equipo {
    /**
     * Constructor: Inicializa los atributos del equipo.
     * @param {number} id - ID del equipo.
     * @param {string} name - Nombre del equipo.
     * @param {string} shortName - Nombre corto del equipo.
     * @param {string} tla - Abreviatura del equipo.
     * @param {string} crest - URL del escudo del equipo.
     * @param {string} address - Dirección del equipo.
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
        shortName,
        tla,
        crest,
        address,
        website,
        founded,
        clubColors,
        venue,
        runningCompetitions = [],
        ligaId = null
    ) {
        this.id = id || equipoIdCounter++; // Auto-generated ID if not provided
        this.name = name;
        this.shortName = shortName;
        this.tla = tla;
        this.crest = crest;
        this.address = address;
        this.website = website;
        this.founded = founded;
        this.clubColors = clubColors;
        this.venue = venue;
        this.runningCompetitions = runningCompetitions;
        this.ligaId = ligaId; // Identificador de la liga
    }

    // Métodos para acceder a los atributos del equipo.
    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getShortName() {
        return this.shortName;
    }

    getTla() {
        return this.tla;
    }

    getCrest() {
        return this.crest;
    }

    getAddress() {
        return this.address;
    }

    getWebsite() {
        return this.website;
    }

    getFounded() {
        return this.founded;
    }

    getClubColors() {
        return this.clubColors;
    }

    getVenue() {
        return this.venue;
    }

    getRunningCompetitions() {
        return this.runningCompetitions;
    }

    getLigaId() {
        return this.ligaId;
    }
}

export default Equipo;