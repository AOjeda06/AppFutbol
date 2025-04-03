class Liga {
    constructor(id, nombre, pais, logo, bandera, temporadas = []) {
        this._id = id;
        this._nombre = nombre;
        this._pais = pais;
        this._logo = logo;
        this._bandera = bandera;
        this._temporadas = temporadas; // Array de temporadas disponibles
    }

    getId() {
        return this._id;
    }

    getNombre() {
        return this._nombre;
    }

    getPais() {
        return this._pais;
    }

    getLogo() {
        return this._logo;
    }

    getBandera() {
        return this._bandera;
    }

    getTemporadas() {
        return this._temporadas;
    }

    setTemporadas(temporadas) {
        this._temporadas = temporadas;
    }
}

export default Liga;