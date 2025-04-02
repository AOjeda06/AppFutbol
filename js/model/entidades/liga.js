class Liga {
    #id;
    #nombre;
    #temporada;
    #equipos;

    constructor(id, nombre, temporada, equipos = []) {
        this.#id = id;
        this.#nombre = nombre;
        this.#temporada = temporada;
        this.#equipos = equipos;
    }

    getId() {
        return this.#id;
    }

    getNombre() {
        return this.#nombre;
    }

    agregarEquipo(equipo) {
        this.#equipos.push(equipo);
    }
}