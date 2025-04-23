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
            const btnFiltrarJugadoresEquipo = document.getElementById("btnFiltrarJugadoresEquipo");
            const btnFiltrarJugadoresPosicion = document.getElementById("btnFiltrarJugadoresPosicion");

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
            if (btnFiltrarJugadoresEquipo) {
                btnFiltrarJugadoresEquipo.addEventListener("click", () => this.mostrarFormularioFiltrarJugadoresPorEquipo());
            }
            if (btnFiltrarJugadoresPosicion) {
                btnFiltrarJugadoresPosicion.addEventListener("click", () => this.mostrarFormularioFiltrarJugadoresPorPosicion());
            }
        });
    }

    mostrarFormularioJugador() {
        this.view.createPlayerForm();
        const submitButton = document.getElementById("addPlayer");
        submitButton.textContent = "Guardar Jugador";
        submitButton.addEventListener("click", (event) => {
            event.preventDefault(); // Prevent default form submission
            this.agregarJugador();
        });
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
        const ligaDropdown = document.getElementById("liga");
        const equiposDropdown = document.getElementById("equipo");

        // Populate leagues dropdown
        const ligas = JSON.parse(localStorage.getItem("ligas")) || [];
        ligas.forEach(liga => {
            const option = document.createElement("option");
            option.value = liga.id;
            option.textContent = liga.name;
            ligaDropdown.appendChild(option);
        });

        // Update teams dropdown when a league is selected
        ligaDropdown.addEventListener("change", () => {
            const selectedLigaId = parseInt(ligaDropdown.value);
            const equipos = JSON.parse(localStorage.getItem("equipos")) || [];
            const equiposDeLiga = equipos.filter(equipo => equipo.ligaId === selectedLigaId);

            equiposDropdown.innerHTML = ""; // Clear existing options
            equiposDeLiga.forEach(equipo => {
                const option = document.createElement("option");
                option.value = equipo.id;
                option.textContent = equipo.name;
                equiposDropdown.appendChild(option);
            });
        });

        const submitButton = document.getElementById("addAssociator");
        submitButton.textContent = "Asignar Jugador";
        submitButton.addEventListener("click", (event) => {
            event.preventDefault(); // Prevent default form submission
            this.asociarJugadorEquipo();
        });
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
        const equipoId = parseInt(document.getElementById("equipo").value);

        if (nombre && posicion && nacimiento && equipoId) {
            this.model.agregarJugador(nombre, posicion, nacimiento, equipoId);
            alert("Jugador agregado correctamente");
        } else {
            alert("Por favor, complete todos los campos");
        }
    }

    agregarEquipo() {
        const nombre = document.getElementById("nombre").value;
        const tla = document.getElementById("tla").value;
        const crest = document.getElementById("crest").value;
        const website = document.getElementById("website").value;
        const founded = document.getElementById("founded").value;
        const clubColors = document.getElementById("clubColors").value;
        const venue = document.getElementById("venue").value;
        const ligaId = parseInt(document.getElementById("liga").value);

        if (nombre && tla && crest && website && founded && clubColors && venue && ligaId) {
            this.model.agregarEquipo(nombre, tla, crest, website, founded, clubColors, venue, ligaId);
            alert("Equipo agregado correctamente");
        } else {
            alert("Por favor, complete todos los campos");
        }
    }

    asociarJugadorEquipo() {
        const ligaId = parseInt(document.getElementById("liga").value);
        const equipoId = parseInt(document.getElementById("equipo").value);
        const jugadorId = parseInt(document.getElementById("jugador-id").value);

        if (ligaId && equipoId && jugadorId) {
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
        const jugadorNombre = document.getElementById("jugador-nombre").value; // Updated to use "jugador-nombre"
        if (jugadorNombre) {
            const jugadores = this.model.buscarJugadorPorNombre(jugadorNombre);
            if (jugadores.length > 0) {
                this.view.renderPlayers(jugadores); // Renderiza todos los jugadores encontrados
            } else {
                alert("No se encontraron jugadores con ese nombre");
            }
        } else {
            alert("Por favor, complete el campo de búsqueda");
        }
    }

    mostrarFormularioFiltrarJugadoresPorEquipo() {
        this.view.createFilterPlayersByTeamForm();
        const filterButton = document.getElementById("filterPlayers");
        filterButton.addEventListener("click", () => this.filtrarJugadoresPorEquipo());
    }

    filtrarJugadoresPorEquipo() {
        const equipoId = parseInt(document.getElementById("equipo").value);
        if (equipoId) {
            const jugadores = this.model.filtrarJugadoresPorEquipo(equipoId);
            if (jugadores.length > 0) {
                this.view.renderPlayers(jugadores); // Render players in the same way as buscarJugador
            } else {
                alert("No se encontraron jugadores para este equipo.");
            }
        } else {
            alert("Por favor, seleccione un equipo válido.");
        }
    }

    mostrarFormularioFiltrarJugadoresPorPosicion() {
        this.view.createFilterPlayersByPositionForm();
        const filterButton = document.getElementById("filterByPosition");
        filterButton.addEventListener("click", () => this.filtrarJugadoresPorPosicion());
    }

    filtrarJugadoresPorPosicion() {
        const posicion = document.getElementById("posicion").value;

        const validPositions = [
            "Goalkeeper", "Defence", "Midfield", "Offence", 
            "Centre-Back", "Centre-Forward", "Right-Back", "Left-Back", 
            "Attacking Midfield", "Central Midfield", "Right Winger", 
            "Right Midfield", "Left Winger"
        ];

        if (validPositions.includes(posicion)) {
            const jugadores = this.model.obtenerJugadoresPorPosicion(posicion);
            if (jugadores.length > 0) {
                this.view.renderPlayers(jugadores); // Render players in columns of 3
            } else {
                alert("No se encontraron jugadores para esta posición.");
            }
        } else {
            alert("Por favor, seleccione una posición válida.");
        }
    }
}