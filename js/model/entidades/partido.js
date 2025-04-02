class Partido {
    #id;
    #equipoLocalId;
    #equipoVisitanteId;
    #estadioId;
    #competicionId;
    #fechaHora;
    #jugado;
    #estadisticas;

    constructor(id, equipoLocalId, equipoVisitanteId, estadioId, competicionId, fechaHora, jugado = false, estadisticas = {}) {
        this.#id = id;
        this.#equipoLocalId = equipoLocalId;
        this.#equipoVisitanteId = equipoVisitanteId;
        this.#estadioId = estadioId;
        this.#competicionId = competicionId;
        this.#fechaHora = fechaHora;
        this.#jugado = jugado;
        this.#estadisticas = {
            local: estadisticas.local || { goles: 0, tarjetasAmarillas: 0, tarjetasRojas: 0, disparos: 0, posesion: 0 },
            visitante: estadisticas.visitante || { goles: 0, tarjetasAmarillas: 0, tarjetasRojas: 0, disparos: 0, posesion: 0 },
        };
    }

    getId() {
        return this.#id;
    }

    getEstadisticas() {
        return this.#estadisticas;
    }
}

export default Partido;