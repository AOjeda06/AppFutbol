/**
 * Clase Estadio: Representa un estadio de fútbol con sus detalles.
 */
class Estadio {
    #id; // ID único del estadio.
    #nombre; // Nombre del estadio.
    #ciudad; // Ciudad donde se encuentra el estadio.
    #capacidad; // Capacidad del estadio (opcional).

    /**
     * Constructor: Inicializa los atributos del estadio.
     * @param {number} id - ID único del estadio.
     * @param {string} nombre - Nombre del estadio.
     * @param {string} ciudad - Ciudad donde se encuentra el estadio.
     * @param {number|null} capacidad - Capacidad del estadio (opcional).
     */
    constructor(id, nombre, ciudad, capacidad = null) {
        this.#id = id;
        this.#nombre = nombre;
        this.#ciudad = ciudad;
        this.#capacidad = capacidad;
    }

    // Métodos para acceder a los atributos del estadio.
    getId() {
        return this.#id;
    }

    getNombre() {
        return this.#nombre;
    }
}

export default Estadio;