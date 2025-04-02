class Copa {
    #id;
    #nombre;
    #temporada;
    #equipos;
    #fases; // Array que representa las fases (grupos, octavos, cuartos, etc.)
    #partidos;

    constructor(id, nombre, temporada, equipos = [], fases = [], partidos = []) {
        this.#id = id;
        this.#nombre = nombre;
        this.#temporada = temporada;
        this.#equipos = equipos; // Equipos participantes
        this.#fases = fases; // Fases de la competición
        this.#partidos = partidos; // Partidos de la competición
    }

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

    agregarEquipo(equipo) {
        this.#equipos.push(equipo);
    }

    agregarFase(fase) {
        this.#fases.push(fase);
    }

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