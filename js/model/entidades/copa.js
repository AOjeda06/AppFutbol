/**
 * Clase Copa: Representa una competición de tipo copa con sus detalles.
 */
class Copa {
    #id; // ID único de la copa.
    #nombre; // Nombre de la copa.
    #temporada; // Temporada de la copa.
    #equipos; // Equipos participantes en la copa.
    #fases; // Fases de la competición (ej. grupos, octavos, cuartos).
    #partidos; // Partidos de la competición.

    /**
     * Constructor: Inicializa los atributos de la copa.
     * @param {number} id - ID único de la copa.
     * @param {string} nombre - Nombre de la copa.
     * @param {string} temporada - Temporada de la copa.
     * @param {Array} equipos - Equipos participantes.
     * @param {Array} fases - Fases de la competición.
     * @param {Array} partidos - Partidos de la competición.
     */
    constructor(id, nombre, temporada, equipos = [], fases = [], partidos = []) {
        this.#id = id;
        this.#nombre = nombre;
        this.#temporada = temporada;
        this.#equipos = equipos;
        this.#fases = fases;
        this.#partidos = partidos;
    }

    // Métodos para acceder a los atributos de la copa.
    getId() {
        return this.#id;
    }

    getNombre() {
        return this.#nombre;
    }

    getTemporada() {
        return this.#temporada;
    }

    getEquipos() {
        return this.#equipos;
    }

    /**
     * Método para agregar un equipo a la copa.
     * @param {Object} equipo - Equipo a agregar.
     */
    agregarEquipo(equipo) {
        this.#equipos.push(equipo);
    }

    /**
     * Método para agregar una fase a la copa.
     * @param {Object} fase - Fase a agregar.
     */
    agregarFase(fase) {
        this.#fases.push(fase);
    }

    /**
     * Método para agregar un partido a la copa.
     * @param {Object} partido - Partido a agregar.
     */
    agregarPartido(partido) {
        this.#partidos.push(partido);
    }

    getPartidos() {
        return this.#partidos;
    }

    getFases() {
        return this.#fases;
    }
}

export default Copa;