let jugadorIdCounter = 300000; // Auto-generated ID starting from 300000

/**
 * Clase Jugador: Representa un jugador de fútbol con sus detalles esenciales.
 */
class Jugador {
    /**
     * Constructor: Inicializa los atributos del jugador.
     * @param {string} strPlayer - Nombre del jugador.
     * @param {string} strPosition - Posición del jugador.
     * @param {string} strNationality - Nacionalidad del jugador.
     * @param {string} dateBorn - Fecha de nacimiento del jugador.
     * @param {string} strTeam - Nombre del equipo actual del jugador.
     * @param {string} strHeight - Altura del jugador.
     * @param {string} strWeight - Peso del jugador.
     */
    constructor(strPlayer, strPosition, strNationality, dateBorn, strTeam, strHeight, strWeight) {
        this.idPlayer = jugadorIdCounter++; // Auto-generated ID
        this.strPlayer = strPlayer;
        this.strPosition = strPosition;
        this.strNationality = strNationality;
        this.dateBorn = dateBorn;
        this.strTeam = strTeam;
        this.strHeight = strHeight;
        this.strWeight = strWeight;
    }

    // Métodos para acceder a los atributos del jugador.
    getIdPlayer() {
        return this.idPlayer;
    }

    getStrPlayer() {
        return this.strPlayer;
    }

    getStrPosition() {
        return this.strPosition;
    }

    getStrNationality() {
        return this.strNationality;
    }

    getDateBorn() {
        return this.dateBorn;
    }

    getStrTeam() {
        return this.strTeam;
    }

    getStrHeight() {
        return this.strHeight;
    }

    getStrWeight() {
        return this.strWeight;
    }
}

export default Jugador;
