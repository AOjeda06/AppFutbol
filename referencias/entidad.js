class Tarea {
    #id;
    #tarea;
    #fecha;
    #estado;
    #visible;

    // Constructor
    constructor(id, tarea, fecha) {
        this.#id = id;
        this.#tarea = tarea;
        this.#fecha = fecha;
        this.#estado = false;
        this.#visible = true;
    }

    // Métodos para acceder a los atributos privados
    getId() {
        return this.#id;
    }

    getTarea() {
        return this.#tarea;
    }

    getFecha() {
        return new Date(this.#fecha).toLocaleDateString(); // Formato más legible
    }

    getEstado() {
        return this.#estado;
    }

    setEstado(estado) {
        this.#estado = estado;
    }

    getVisible() {
        return this.#visible;
    }

    setVisible(visible) {
        this.#visible = visible;
    }
}
