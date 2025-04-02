class Equipo {
    #id;
    #tipo;
    #nombre;
    #ciudad;
    #pais;
    #estadioId;
    #plantilla;
    #entrenador;
    #estadisticas;

    constructor(id, tipo, nombre, ciudad = null, pais = null, estadioId = null, entrenador = null, plantilla = [], estadisticas = {}) {
        this.#id = id;
        this.#tipo = tipo;
        this.#nombre = nombre;
        this.#ciudad = ciudad;
        this.#pais = pais;
        this.#estadioId = estadioId;
        this.#entrenador = entrenador;
        this.#plantilla = plantilla;
        this.#estadisticas = {
            ganados: estadisticas.ganados || 0,
            perdidos: estadisticas.perdidos || 0,
            empatados: estadisticas.empatados || 0,
            golesFavor: estadisticas.golesFavor || 0,
            golesContra: estadisticas.golesContra || 0,
            tarjetasAmarillasTotales: estadisticas.tarjetasAmarillasTotales || 0,
            tarjetasRojasTotales: estadisticas.tarjetasRojasTotales || 0,
        };
    }

    getId() {
        return this.#id;
    }

    getNombre() {
        return this.#nombre;
    }

    getPlantilla() {
        return this.#plantilla;
    }

    agregarJugador(jugador) {
        this.#plantilla.push(jugador);
    }
}

export default Equipo;