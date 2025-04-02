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
    #esSeleccion;

    constructor(id, tipo, nombre, ciudad = null, pais = null, estadioId = null, entrenador = null, plantilla = [], estadisticas = {}, esSeleccion = false) {
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
        this.#esSeleccion = esSeleccion;
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

    esEquipoSeleccion() {
        return this.#esSeleccion;
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
        this.#estadisticas.tarjetasAmarillasTotales += nuevasEstadisticas.tarjetasAmarillasTotales || 0;
        this.#estadisticas.tarjetasRojasTotales += nuevasEstadisticas.tarjetasRojasTotales || 0;
    }
}

export default Equipo;