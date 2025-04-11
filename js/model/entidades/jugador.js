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
     * @param {number} equipoId - ID del equipo al que pertenece el jugador.
     */
    constructor(id, name, position, dateOfBirth, nationality, equipoId) {
        this.id = id || jugadorIdCounter++; 
        this.name = name; // Asegúrate de que 'name' se usa en lugar de 'strPlayer'
        this.position = position; // Asegúrate de que 'position' se usa en lugar de 'strPosition'
        this.dateOfBirth = dateOfBirth;
        this.nationality = nationality;
        this.equipoId = equipoId;
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

    getEquipoId() {
        return this.equipoId;
    }

    // Método para actualizar el atributo equipoId.
    setEquipoId(nuevoEquipoId) {
        this.equipoId = nuevoEquipoId;
    }
}

export default Jugador;
