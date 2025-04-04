let equipoIdCounter = 200000; // Auto-generated ID starting from 200000

/**
 * Clase Equipo: Representa un equipo de fútbol con sus detalles esenciales.
 */
class Equipo {
    /**
     * Constructor: Inicializa los atributos del equipo.
     * @param {string} strTeam - Nombre del equipo.
     * @param {string} strLeague - Liga principal del equipo.
     * @param {string} strCountry - País del equipo.
     * @param {number} intFormedYear - Año de fundación del equipo.
     * @param {string} strStadium - Nombre del estadio del equipo.
     * @param {number} intStadiumCapacity - Capacidad del estadio.
     * @param {string|null} strLeague1 - Liga adicional (ej. Champions League).
     * @param {string|null} strLeague2 - Liga adicional 2.
     * @param {string|null} strLeague3 - Liga adicional 3.
     * @param {string|null} strLeague4 - Liga adicional 4.
     * @param {string|null} strLeague5 - Liga adicional 5.
     * @param {string|null} strLeague6 - Liga adicional 6.
     * @param {string|null} strLeague7 - Liga adicional 7.
     */
    constructor(
        strTeam,
        strLeague,
        strCountry,
        intFormedYear,
        strStadium,
        intStadiumCapacity,
        strLeague1 = null,
        strLeague2 = null,
        strLeague3 = null,
        strLeague4 = null,
        strLeague5 = null,
        strLeague6 = null,
        strLeague7 = null
    ) {
        this.idTeam = equipoIdCounter++; // Auto-generated ID
        this.strTeam = strTeam;
        this.strLeague = strLeague;
        this.strCountry = strCountry;
        this.intFormedYear = intFormedYear;
        this.strStadium = strStadium;
        this.intStadiumCapacity = intStadiumCapacity;
        this.strLeague1 = strLeague1; // Liga adicional
        this.strLeague2 = strLeague2;
        this.strLeague3 = strLeague3;
        this.strLeague4 = strLeague4;
        this.strLeague5 = strLeague5;
        this.strLeague6 = strLeague6;
        this.strLeague7 = strLeague7;
    }

    // Métodos para acceder a los atributos del equipo.
    getIdTeam() {
        return this.idTeam;
    }

    getStrTeam() {
        return this.strTeam;
    }

    getStrLeague() {
        return this.strLeague;
    }

    getStrCountry() {
        return this.strCountry;
    }

    getStrStadium() {
        return this.strStadium;
    }

    getIntStadiumCapacity() {
        return this.intStadiumCapacity;
    }

    getStrLeague1() {
        return this.strLeague1;
    }

    getStrLeague2() {
        return this.strLeague2;
    }

    getStrLeague3() {
        return this.strLeague3;
    }

    getStrLeague4() {
        return this.strLeague4;
    }

    getStrLeague5() {
        return this.strLeague5;
    }

    getStrLeague6() {
        return this.strLeague6;
    }

    getStrLeague7() {
        return this.strLeague7;
    }

    /**
     * Método para establecer una liga adicional.
     * @param {string} leagueKey - Clave de la liga adicional (ej. strLeague1, strLeague2).
     * @param {string} leagueValue - Nombre de la liga adicional.
     */
    setAdditionalLeague(leagueKey, leagueValue) {
        if (this.hasOwnProperty(leagueKey)) {
            this[leagueKey] = leagueValue;
        }
    }
}

export default Equipo;