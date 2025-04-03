class Jugador {
    _id;
    _nombre;
    _apellidos;
    _apodo;
    _posicion;
    _numero;
    _anioNacimiento;
    _equipoId;

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

    setEquipoId(equipoId) {
        this._equipoId = equipoId;
    }
}

export default Jugador;
