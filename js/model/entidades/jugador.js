class Jugador {
    #id;
    #nombre;
    #apellidos;
    #apodo;
    #posicion;
    #numero;
    #anioNacimiento;
    #equipoId;

    constructor(id, nombre, apellidos, apodo, posicion, numero, anioNacimiento, equipoId) {
        this.#id = id;
        this.#nombre = nombre;
        this.#apellidos = apellidos;
        this.#apodo = apodo;
        this.#posicion = posicion;
        this.#numero = numero;
        this.#anioNacimiento = anioNacimiento;
        this.#equipoId = equipoId;
    }

    getId() {
        return this.#id;
    }

    getNombre() {
        return this.#nombre;
    }

    getApellidos() {
        return this.#apellidos;
    }

    getApodo() {
        return this.#apodo;
    }

    getPosicion() {
        return this.#posicion;
    }

    getNumero() {
        return this.#numero;
    }

    getAnioNacimiento() {
        return this.#anioNacimiento;
    }

    getEquipoId() {
        return this.#equipoId;
    }

    setEquipoId(equipoId) {
        this.#equipoId = equipoId;
    }
}

export default Jugador;
