/**
 * Clase Jugador: Representa un jugador de fútbol con sus detalles.
 */
class Jugador {
    _id; // ID único del jugador.
    _nombre; // Nombre del jugador.
    _apellidos; // Apellidos del jugador.
    _apodo; // Apodo del jugador.
    _posicion; // Posición en la que juega (ej. delantero, defensa).
    _numero; // Número de camiseta del jugador.
    _anioNacimiento; // Año de nacimiento del jugador.
    _equipoId; // ID del equipo al que pertenece el jugador.

    /**
     * Constructor: Inicializa los atributos del jugador.
     * @param {number} id - ID único del jugador.
     * @param {string} nombre - Nombre del jugador.
     * @param {string} apellidos - Apellidos del jugador.
     * @param {string} apodo - Apodo del jugador.
     * @param {string} posicion - Posición en la que juega.
     * @param {number} numero - Número de camiseta del jugador.
     * @param {number} anioNacimiento - Año de nacimiento del jugador.
     * @param {number} equipoId - ID del equipo al que pertenece.
     */
    constructor(id, nombre, apellidos, apodo, posicion, numero, anioNacimiento, equipoId) {
        this._id = id;
        this._nombre = nombre;
        this._apellidos = apellidos;
        this._apodo = apodo;
        this._posicion = posicion;
        this._numero = numero;
        this._anioNacimiento = anioNacimiento;
        this._equipoId = equipoId;
    }

    // Métodos para acceder a los atributos del jugador.
    getId() {
        return this._id;
    }

    getNombre() {
        return this._nombre;
    }

    getApellidos() {
        return this._apellidos;
    }

    getApodo() {
        return this._apodo;
    }

    getPosicion() {
        return this._posicion;
    }

    getNumero() {
        return this._numero;
    }

    getAnioNacimiento() {
        return this._anioNacimiento;
    }

    getEquipoId() {
        return this._equipoId;
    }

    /**
     * Método para actualizar el equipo al que pertenece el jugador.
     * @param {number} equipoId - ID del nuevo equipo.
     */
    setEquipoId(equipoId) {
        this._equipoId = equipoId;
    }
}

export default Jugador;
