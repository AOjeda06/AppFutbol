class Estadio {
    #id;
    #nombre;
    #ciudad;
    #capacidad;

    constructor(id, nombre, ciudad, capacidad = null) {
        this.#id = id;
        this.#nombre = nombre;
        this.#ciudad = ciudad;
        this.#capacidad = capacidad;
    }

    getId() {
        return this.#id;
    }

    getNombre() {
        return this.#nombre;
    }
}