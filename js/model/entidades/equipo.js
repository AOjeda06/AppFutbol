class Equipo {
    #id;
    #tipo;
    #nombre;
    #ciudad;
    #pais;
    #estadioId;
    #plantilla;
    #estadisticas;

    constructor(id, tipo, nombre, ciudad = null, pais = null, estadioId = null, plantilla = [], estadisticas = {}) {
        this.#id = id;
        this.#tipo = tipo;
        this.#nombre = nombre;
        this.#ciudad = ciudad;
        this.#pais = pais;
        this.#estadioId = estadioId;
        this.#plantilla = plantilla;
        this.#estadisticas = {
            ganados: estadisticas.ganados || 0,
            perdidos: estadisticas.perdidos || 0,
            empatados: estadisticas.empatados || 0,
            golesFavor: estadisticas.golesFavor || 0,
            golesContra: estadisticas.golesContra || 0
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

    getEstadisticas() {
        return this.#estadisticas;
    }

    actualizarEstadisticas(nuevasEstadisticas) {
        this.#estadisticas.ganados += nuevasEstadisticas.ganados || 0;
        this.#estadisticas.perdidos += nuevasEstadisticas.perdidos || 0;
        this.#estadisticas.empatados += nuevasEstadisticas.empatados || 0;
        this.#estadisticas.golesFavor += nuevasEstadisticas.golesFavor || 0;
        this.#estadisticas.golesContra += nuevasEstadisticas.golesContra || 0;
    }
}

export default Equipo;