class View {
    constructor() {
        this.view = document.querySelector("#vista");
    }

    createPlayerForm() {
        this.view.innerHTML = `<div id="jugador-form">
    <h2>Crear Jugador</h2>
    <label for="nombre">Nombre:</label>
    <input type="text" id="nombre" required>
    <br>
    <label for ="posicion">Posición:</label>
    <input type="text" id="posicion" required>
    <br>
    <label for="nacimiento">Fecha de Nacimiento:</label>
    <input type="date" id="nacimiento" required>
    <br>
    <label for="equipo">Equipo:</label>
    <input type="text" id="equipo" required>
    </div>`
    }

    createTeamForm() {
        this.view.innerHTML = `<div id="equipo-form">
    <h2>Crear Equipo</h2>
    <label for="nombre">Nombre:</label>
    <input type="text" id="nombre" required>
    <br>
    <label for="ciudad">Ciudad:</label>
    <input type="text" id="ciudad" required>
    <br>
    <label for="estadio">Estadio:</label>
    <input type="text" id="estadio" required>
    </div>`
    }

    createAssociatorForm() {
        this.view.innerHTML = `<div id="asociador-form">
    <h2>Asociar Jugador a Equipo</h2>
    <label for="jugador">Jugador:</label>
    <input type="number" id="jugador-id" required>
    <br>
    <label for="equipo">Equipo:</label>
    <input type="number" id="equipo" required>
    <br>
    </div>`
    }




}