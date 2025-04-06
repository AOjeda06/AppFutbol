let jugadorIdCounter = 300000; // Auto-generated ID starting from 300000

/**
 * Clase Jugador: Representa un jugador de fútbol con sus detalles esenciales.
 */
class Jugador {
    /**
     * Constructor: Inicializa los atributos del jugador.
     * @param {number} id - ID del jugador.
     * @param {string} name - Nombre del jugador.
     * @param {string} position - Posición del jugador.
     * @param {string} dateOfBirth - Fecha de nacimiento del jugador.
     * @param {string} nationality - Nacionalidad del jugador.
     */
    constructor(id, name, position, dateOfBirth, nationality) {
        this.id = id || jugadorIdCounter++; // Auto-generated ID if not provided
        this.name = name;
        this.position = position;
        this.dateOfBirth = dateOfBirth;
        this.nationality = nationality;
    }

    // Métodos para acceder a los atributos del jugador.
    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getPosition() {
        return this.position;
    }

    getDateOfBirth() {
        return this.dateOfBirth;
    }

    getNationality() {
        return this.nationality;
    }
}

export default Jugador;
