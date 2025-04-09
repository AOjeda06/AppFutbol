import { Model } from "../model/model.js";
import View from "../view/view.js";

export class Controller {
    constructor() {
        this.model = new Model();
        this.view = new View();

        // Inicializar el modelo
        this.model.inicializar().then(() => {
            console.log("Modelo inicializado correctamente.");
        }).catch(error => {
            console.error("Error al inicializar el modelo:", error);
        });

        document.addEventListener("DOMContentLoaded", () => {
            document.getElementById("btnAgregarJugador").addEventListener("click", () => this.mostrarFormularioJugador());
            document.getElementById("btnAgregarEquipo").addEventListener("click", () => this.mostrarFormularioEquipo());
            document.getElementById("btnAsignarEquipo").addEventListener("click", () => this.mostrarFormularioAsociacion());
            document.getElementById("btnEliminarJugador").addEventListener("click", () => this.mostrarFormularioEliminarJugador());
            document.getElementById("btnEliminarEquipo").addEventListener("click", () => this.mostrarFormularioEliminarEquipo());
            document.getElementById("btnBuscarJugador").addEventListener("click", () => this.mostrarFormularioBuscarJugador());
            document.getElementById("btnBuscarEquipo").addEventListener("click", () => this.mostrarFormularioBuscarEquipo());
        });
    }

    mostrarFormularioJugador() {
        this.view.createPlayerForm();
        const submitButton = document.querySelector("addPlayer");
        submitButton.textContent = "Guardar Jugador";
        submitButton.addEventListener("click", () => this.agregarJugador());
        document.getElementById("jugador-form").appendChild(submitButton);
    }

    mostrarFormularioEquipo() {
        this.view.createTeamForm();
        const submitButton = document.querySelector("addTeam");
        submitButton.textContent = "Guardar Equipo";
        submitButton.addEventListener("click", () => this.agregarEquipo());
        document.getElementById("equipo-form").appendChild(submitButton);
    }

    mostrarFormularioAsociacion() {
        this.view.createAssociatorForm();
        const submitButton = document.querySelector("addAssociator");
        submitButton.textContent = "Asignar Jugador";
        submitButton.addEventListener("click", () => this.asociarJugadorEquipo());
        document.getElementById("asociador-form").appendChild(submitButton);
    }

    agregarJugador() {
        const nombre = document.getElementById("nombre").value;
        const posicion = document.getElementById("posicion").value;
        const nacimiento = document.getElementById("nacimiento").value;
        const equipo = document.getElementById("equipo").value;

        if (nombre && posicion && nacimiento && equipo) {
            this.model.agregarJugador(nombre, posicion, nacimiento, equipo);
            alert("Jugador agregado correctamente");
        } else {
            alert("Por favor, complete todos los campos");
        }
    }

    agregarEquipo() {
        const nombre = document.getElementById("nombre").value;
        const ciudad = document.getElementById("ciudad").value;
        const estadio = document.getElementById("estadio").value;

        if (nombre && ciudad && estadio) {
            this.model.agregarEquipo(nombre, ciudad, estadio);
            alert("Equipo agregado correctamente");
        } else {
            alert("Por favor, complete todos los campos");
        }
    }

    asociarJugadorEquipo() {
        const jugadorId = document.getElementById("jugador-id").value;
        const equipoId = document.getElementById("equipo").value;

        if (jugadorId && equipoId) {
            try {
                this.model.asignarJugadorAEquipo(jugadorId, equipoId);
                alert("Jugador asignado al equipo correctamente");
            } catch (error) {
                alert(error.message);
            }
        } else {
            alert("Por favor, complete todos los campos");
        }
    }
    mostrarFormularioEliminarJugador() {
        this.view.createDeletePlayerForm();
        const submitButton = document.querySelector("deletePlayer");
        submitButton.addEventListener("click", () => this.eliminarJugador());
    }

    mostrarFormularioEliminarEquipo() {
        this.view.createDeleteTeamForm();
        const submitButton = document.querySelector("deleteTeam");
        submitButton.addEventListener("click", () => this.eliminarEquipo());
    }

    eliminarJugador() {
        const jugadorId = document.getElementById("jugador-id").value;
        if (jugadorId) {
            this.model.eliminarJugador(jugadorId);
            alert("Jugador eliminado correctamente");
        } else {
            alert("Por favor, complete todos los campos");
        }
    }
    eliminarEquipo() {
        const equipoId = document.getElementById("equipo-id").value;
        if (equipoId) {
            this.model.eliminarEquipo(equipoId);
            alert("Equipo eliminado correctamente");
        } else {
            alert("Por favor, complete todos los campos");
        }
    }
    mostrarFormularioBuscarEquipo() {
        this.view.createSearchTeamForm();
        const submitButton = document.querySelector("searchTeam");
        submitButton.addEventListener("click", () => this.buscarEquipo());
    }

    buscarEquipo() {
        const equipoId = document.getElementById("equipo-id").value;
        if (equipoId) {
            const equipo = this.model.buscarEquipo(equipoId);
            if (equipo) {
                alert(`Equipo encontrado: ${equipo.nombre}, Ciudad: ${equipo.ciudad}, Estadio: ${equipo.estadio}`);
            } else {
                alert("Equipo no encontrado");
            }
        } else {
            alert("Por favor, complete todos los campos");
        }
    }
    mostrarFormularioBuscarJugador() {
        this.view.createSearchPlayerForm();
        const submitButton = document.querySelector("searchPlayer");
        submitButton.addEventListener("click", () => this.buscarJugador());
    }

    buscarJugador() {
        const jugadorId = document.getElementById("jugador-id").value;
        if (jugadorId) {
            const jugador = this.model.buscarJugador(jugadorId);
            if (jugador) {
                alert(`Jugador encontrado: ${jugador.nombre}, Posición: ${jugador.posicion}, Nacimiento: ${jugador.nacimiento}, Equipo: ${jugador.equipo}`);
            } else {
                alert("Jugador no encontrado");
            }
        } else {
            alert("Por favor, complete todos los campos");
        }
    }
}