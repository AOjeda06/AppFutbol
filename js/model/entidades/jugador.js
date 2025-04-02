class Jugador {
    #id;
    #nombre;
    #apellidos;
    #apodo;
    #posicion;
    #numero;
    #anioNacimiento;
    #equipoId;
    #estadisticas;

    constructor(id, nombre, apellidos, apodo, posicion, numero, anioNacimiento, equipoId, estadisticas = {}) {
        this.#id = id;
        this.#nombre = nombre;
        this.#apellidos = apellidos;
        this.#apodo = apodo;
        this.#posicion = posicion;
        this.#numero = numero;
        this.#anioNacimiento = anioNacimiento;
        this.#equipoId = equipoId;
        this.#estadisticas = {
            partidosJugados: estadisticas.partidosJugados || 0,
            goles: estadisticas.goles || 0,
            asistencias: estadisticas.asistencias || 0,
            tarjetasAmarillas: estadisticas.tarjetasAmarillas || 0,
            tarjetasRojas: estadisticas.tarjetasRojas || 0,
        };
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

    getEstadisticas() {
        return this.#estadisticas;
    }

    actualizarEstadisticas(nuevasEstadisticas) {
        this.#estadisticas.partidosJugados += nuevasEstadisticas.partidosJugados || 0;
        this.#estadisticas.goles += nuevasEstadisticas.goles || 0;
        this.#estadisticas.asistencias += nuevasEstadisticas.asistencias || 0;
        this.#estadisticas.tarjetasAmarillas += nuevasEstadisticas.tarjetasAmarillas || 0;
        this.#estadisticas.tarjetasRojas += nuevasEstadisticas.tarjetasRojas || 0;
    }
}

export default Jugador;
