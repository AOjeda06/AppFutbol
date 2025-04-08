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
}