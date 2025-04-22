// Clase controlador
const Controller = {
    // Inicialización de la vista
    init: function () {
        View.init();
    },

    // Función para manejar el envío del formulario
    handleFormSubmit: function (event) {
        event.preventDefault();

        try {
            let objJson = Model.generarObj();

            // Validación de entrada
            if (!objJson.getTarea().trim()) {
                alert("La tarea no puede estar vacía.");
                return;
            }

            // Guardar la tarea
            Model.guardarTarea(objJson);

            // Actualizamos la tabla
            View.actualizarTabla(Model.obtenerTareas());
        } catch (error) {
            console.error("Error al procesar el formulario:", error);
            alert("Ocurrió un error al agregar la tarea. Por favor, inténtalo de nuevo.");
        }
    },

    // Función para manejar el clic en el botón de eliminar
    handleDeleteButtonClick: function () {
        let id = $(this).closest("tr").data("id");
        Model.eliminarTarea(id);

        // Actualizamos la tabla
        View.actualizarTabla(Model.obtenerTareas());
    },

    // Función para manejar el clic en el botón de cambiar estado
    handleStateClick: function () {
        let id = $(this).closest("tr").data("id");
        Model.cambiarEstado(id);

        // Actualizamos la tabla
        View.actualizarTabla(Model.obtenerTareas());
    },

    handleAddTeam: function (event) {
        event.preventDefault();
        const teamData = View.getTeamFormData();
        Model.agregarEquipo(teamData.nombre, teamData.ciudad, teamData.estadio, teamData.liga);
        View.renderTeams(Model.obtenerEquipos());
    },

    handleAddPlayer: function (event) {
        event.preventDefault();
        const playerData = View.getPlayerFormData();
        Model.agregarJugador(playerData.nombre, playerData.posicion, playerData.nacimiento, playerData.equipo);
        View.renderPlayers(Model.obtenerJugadores(), Model.obtenerEquipos()); // Pasar equipos
    },

    handleChangePlayerTeam: function (playerId, newTeamId) {
        Model.asignarJugadorAEquipo(playerId, newTeamId);
        View.renderPlayers(Model.obtenerJugadores());
    },

    handleSearchTeamByName: function (teamName) {
        const teams = Model.obtenerEquipos().filter(team => team.name.includes(teamName));
        View.renderTeams(teams);
    },

    handleShowTeamsByLeague: function (leagueId) {
        const teams = Model.obtenerEquipos().filter(team => team.ligaId === leagueId);
        View.renderTeamsByLeague(teams);
    },

    handleShowPlayersByTeam: function (teamId) {
        const players = Model.obtenerJugadores().filter(player => player.equipoId === teamId);
        View.renderPlayersByTeam(players, Model.obtenerEquipos()); // Pasar equipos
    },

    handleSearchPlayerByName: function (playerName) {
        const player = Model.obtenerJugadores().find(player => player.name.includes(playerName));
        if (player) {
            View.renderPlayerDetails(player);
        } else {
            alert("Jugador no encontrado.");
        }
    },

    handleShowLeagues: function () {
        const ligas = Model.obtenerDatosLigas();
        console.log("Ligas disponibles:", ligas);
        // Aquí puedes agregar lógica para renderizar las ligas si es necesario
    },

    handleFilterTeamsByCompetition: function (competitionId) {
        const teams = Model.obtenerEquiposPorCompetencia(competitionId);
        View.renderTeams(teams);
    }
};