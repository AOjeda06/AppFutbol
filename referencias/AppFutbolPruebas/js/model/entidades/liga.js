/**
 * Clase Liga: Representa una liga de fútbol con sus detalles.
 */
class Liga {
    /**
     * Constructor: Inicializa los atributos de la liga.
     * @param {number} id - ID único de la liga.
     * @param {string} nombre - Nombre de la liga.
     * @param {string} pais - País al que pertenece la liga.
     * @param {string} logo - URL del logo de la liga.
     * @param {string} bandera - URL de la bandera del país.
     * @param {Array} temporadas - Array de temporadas disponibles.
     */
    constructor(id, nombre, pais, logo, bandera, temporadas = []) {
        this._id = id;
        this._nombre = nombre;
        this._pais = pais;
        this._logo = logo;
        this._bandera = bandera;
        this._temporadas = temporadas;
    }

    // Métodos para acceder a los atributos de la liga.
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

    /**
     * Método para establecer las temporadas disponibles.
     * @param {Array} temporadas - Array de temporadas.
     */
    setTemporadas(temporadas) {
        this._temporadas = temporadas;
    }
}

export default Liga;