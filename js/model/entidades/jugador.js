let jugadorIdCounter = 300000; // Auto-generated ID starting from 300000

/**
 * Clase Jugador: Representa un jugador de fútbol con sus detalles esenciales.
 */
class Jugador {
    /**
     * Constructor: Inicializa los atributos del jugador.
     * 
     * @param {number} id - ID del jugador.
     * @param {string} name - Nombre del jugador.
     * @param {string} position - Posición del jugador.
     * @param {string} dateOfBirth - Fecha de nacimiento del jugador.
     * @param {string} nationality - Nacionalidad del jugador.
     * @param {number} equipoId - ID del equipo al que pertenece el jugador.
     */
    constructor(id, name, position, dateOfBirth, nationality, equipoId) {
        this.id = id || jugadorIdCounter++; // Genera un ID automáticamente si no se proporciona.
        this.name = name;
        this.position = position;
        this.dateOfBirth = dateOfBirth;
        this.nationality = nationality;
        this.equipoId = equipoId; // Relación con el equipo.
    }

    /**
     * Devuelve el ID del jugador.
     * @returns {number} ID del jugador.
     */
    getId() {
        return this.id;
    }

    /**
     * Devuelve el nombre del jugador.
     * @returns {string} Nombre del jugador.
     */
    getName() {
        return this.name;
    }

    /**
     * Devuelve la posición del jugador.
     * @returns {string} Posición del jugador.
     */
    getPosition() {
        return this.position;
    }

    /**
     * Devuelve la fecha de nacimiento del jugador.
     * @returns {string} Fecha de nacimiento del jugador.
     */
    getDateOfBirth() {
        return this.dateOfBirth;
    }

    /**
     * Devuelve la nacionalidad del jugador.
     * @returns {string} Nacionalidad del jugador.
     */
    getNationality() {
        return this.nationality;
    }

    /**
     * Devuelve el ID del equipo al que pertenece el jugador.
     * @returns {number} ID del equipo.
     */
    getEquipoId() {
        return this.equipoId;
    }

    /**
     * Actualiza el ID del equipo al que pertenece el jugador.
     * @param {number} nuevoEquipoId - Nuevo ID del equipo.
     */
    setEquipoId(nuevoEquipoId) {
        this.equipoId = nuevoEquipoId;
    }
}

export default Jugador;
