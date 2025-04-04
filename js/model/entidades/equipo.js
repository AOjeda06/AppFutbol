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
     */
    constructor(strTeam, strLeague, strCountry, intFormedYear, strStadium, intStadiumCapacity, strLeague1 = null) {
        this.idTeam = equipoIdCounter++; // Auto-generated ID
        this.strTeam = strTeam;
        this.strLeague = strLeague;
        this.strCountry = strCountry;
        this.intFormedYear = intFormedYear;
        this.strStadium = strStadium;
        this.intStadiumCapacity = intStadiumCapacity;
        this.strLeague1 = strLeague1; // Liga adicional
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

    /**
     * Método para establecer la liga adicional.
     * @param {string} strLeague1 - Liga adicional (ej. Champions League).
     */
    setStrLeague1(strLeague1) {
        this.strLeague1 = strLeague1;
    }
}

export default Equipo;