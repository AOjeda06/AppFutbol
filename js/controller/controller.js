import { Model } from "../model/model.js"; // Correcto: Model está exportado como named export
import View from "../view/view.js"; // Correcto: View está exportado como default export

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
            const btnAgregarJugador = document.getElementById("btnAgregarJugador");
            const btnAgregarEquipo = document.getElementById("btnAgregarEquipo");
            const btnAsignarEquipo = document.getElementById("btnAsignarEquipo");
            const btnEliminarJugador = document.getElementById("btnEliminarJugador");
            const btnEliminarEquipo = document.getElementById("btnEliminarEquipo");
            const btnBuscarJugador = document.getElementById("btnBuscarJugador");
            const btnBuscarEquipo = document.getElementById("btnBuscarEquipo");
            const btnMostrarEquipos = document.getElementById("btnMostrarEquipos"); // Botón en el menú principal

            if (btnAgregarJugador) {
                btnAgregarJugador.addEventListener("click", () => this.mostrarFormularioJugador());
            }
            if (btnAgregarEquipo) {
                btnAgregarEquipo.addEventListener("click", () => this.mostrarFormularioEquipo());
            }
            if (btnAsignarEquipo) {
                btnAsignarEquipo.addEventListener("click", () => this.mostrarFormularioAsociacion());
            }
            if (btnEliminarJugador) {
                btnEliminarJugador.addEventListener("click", () => this.mostrarFormularioEliminarJugador());
            }
            if (btnEliminarEquipo) {
                btnEliminarEquipo.addEventListener("click", () => this.mostrarFormularioEliminarEquipo());
            }
            if (btnBuscarJugador) {
                btnBuscarJugador.addEventListener("click", () => this.mostrarFormularioBuscarJugador());
            }
            if (btnBuscarEquipo) {
                btnBuscarEquipo.addEventListener("click", () => this.mostrarFormularioBuscarEquipo());
            }
            if (btnMostrarEquipos) {
                btnMostrarEquipos.addEventListener("click", () => this.mostrarFormularioSeleccionLiga());
            }
        });
    }

    mostrarFormularioJugador() {
        this.view.createPlayerForm();
        const submitButton = document.getElementById("addPlayer"); // Updated selector
        submitButton.textContent = "Guardar Jugador";
        submitButton.addEventListener("click", () => this.agregarJugador());
        document.getElementById("jugador-form").appendChild(submitButton);
    }

    mostrarFormularioEquipo() {
        this.view.createTeamForm();
        const submitButton = document.getElementById("addTeam");
        submitButton.textContent = "Guardar Equipo";
        submitButton.addEventListener("click", (event) => {
            event.preventDefault(); // Evitar el comportamiento por defecto del formulario
            this.agregarEquipo();
        });
    }

    mostrarFormularioAsociacion() {
        this.view.createAssociatorForm();
        const submitButton = document.getElementById("addAssociator"); // Updated selector
        submitButton.textContent = "Asignar Jugador";
        submitButton.addEventListener("click", () => this.asociarJugadorEquipo());
        document.getElementById("asociador-form").appendChild(submitButton);
    }

    mostrarFormularioSeleccionLiga() {
        this.view.createLeagueSelectionForm(); // Renderiza el formulario
        const showTeamsButton = document.getElementById("showTeams"); // Botón dentro del formulario
        if (showTeamsButton) {
            showTeamsButton.addEventListener("click", () => this.mostrarEquiposPorLiga());
        }
    }

    mostrarEquiposPorLiga() {
        const ligaId = parseInt(document.getElementById("liga").value); // Obtiene el ID de la liga seleccionada
        console.log("Liga seleccionada:", ligaId); // Debug: Verifica el ID de la liga seleccionada

        const equipos = this.model.obtenerEquiposPorLiga(ligaId); // Obtiene los equipos de la liga
        if (equipos.length > 0) {
            this.view.renderTeams(equipos); // Renderiza los equipos
        } else {
            console.warn("No se encontraron equipos para la liga seleccionada."); // Debug: Mensaje de advertencia
            alert("No se encontraron equipos para la liga seleccionada.");
        }
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
        const submitButton = document.getElementById("deletePlayer"); // Updated selector
        submitButton.addEventListener("click", () => this.eliminarJugador());
    }

    mostrarFormularioEliminarEquipo() {
        this.view.createDeleteTeamForm();
        const submitButton = document.getElementById("deleteTeam"); // Updated selector
        submitButton.addEventListener("click", (event) => {
            event.preventDefault(); // Evitar el comportamiento por defecto del formulario
            this.eliminarEquipo();
        });
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
            try {
                this.model.eliminarEquipo(equipoId);
                alert("Equipo eliminado correctamente");
            } catch (error) {
                alert(error.message);
            }
        } else {
            alert("Por favor, complete todos los campos");
        }
    }

    mostrarFormularioBuscarEquipo() {
        this.view.createSearchTeamForm();
        const submitButton = document.getElementById("searchTeam"); // Updated selector
        submitButton.addEventListener("click", () => this.buscarEquipo());
    }

    buscarEquipo() {
        const equipoNombre = document.getElementById("equipo-nombre").value;
        if (equipoNombre) {
            const equipos = this.model.buscarEquipoPorNombre(equipoNombre);
            if (equipos.length > 0) {
                this.view.renderTeams(equipos); // Renderiza todos los equipos encontrados
            } else {
                alert("No se encontraron equipos con ese nombre");
            }
        } else {
            alert("Por favor, complete el campo de búsqueda");
        }
    }

    mostrarFormularioBuscarJugador() {
        this.view.createSearchPlayerForm();
        const submitButton = document.getElementById("searchPlayer"); // Updated selector
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