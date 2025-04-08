class View {
    constructor() {
        this.view = document.querySelector("#vista");
    }

    createPlayerForm() {
        this.view.innerHTML = `<div id="jugador-form">
    <form>
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
    <br>
    <button type="submit" id="addPlayer">Agregar Jugador</button>
    </form>
    </div>`
    }

    createTeamForm() {
        this.view.innerHTML = `<div id="equipo-form">
    <form>
    <h2>Crear Equipo</h2>
    <label for="nombre">Nombre:</label>
    <input type="text" id="nombre" required>
    <br>
    <label for="ciudad">Ciudad:</label>
    <input type="text" id="ciudad" required>
    <br>
    <label for="estadio">Estadio:</label>
    <input type="text" id="estadio" required>
    <br>
    <button type="submit" id="addTeam">Agregar Equipo</button>
    </form>
    </div>`
    }

    createAssociatorForm() {
        this.view.innerHTML = `<div id="asociador-form">
    <form>
    <h2>Asociar Jugador a Equipo</h2>
    <label for="jugador">Jugador:</label>
    <input type="number" id="jugador-id" required>
    <br>
    <label for="equipo">Equipo:</label>
    <input type="number" id="equipo" required>
    <br>
    <button type="submit" id="addAssociator">Asignar Jugador</button>
    </form>
    </div>`
    }

    createDeletePlayerForm() {
        this.view.innerHTML = `<div id="borrar-form">
    <form>
    <h2>Borrar Jugador</h2>
    <label>ID Jugador:</label>
    <input type="number" id="jugador-id" required>
    <button type="submit" id="deletePlayer">Borrar Jugador</button>
    </form>
    </div>`
    }
    createDeleteTeamForm() {
        this.view.innerHTML = `<div id="borrar-form">
    <form>
    <h2>Borrar Equipo</h2>
    <label>ID Equipo:</label>
    <input type="number" id="equipo-id" required>
    <button type="submit" id="deleteTeam">Borrar Eqiupo</button>
    </form>
    </div>`
    }

    getPlayerFormData() {

        let player = [];
        const nombre = document.getElementById("nombre").value;
        const posicion = document.getElementById("posicion").value;
        const nacimiento = document.getElementById("nacimiento").value;
        const equipo = document.getElementById("equipo").value;
        player.push(nombre, posicion, nacimiento, equipo);
        return player;

    }

    getTeamFormData() {
        let team = [];
        const nombre = document.getElementById("nombre").value;
        const ciudad = document.getElementById("ciudad").value;
        const estadio = document.getElementById("estadio").value;
        team.push(nombre, ciudad, estadio);
        return team;
    }

    renderTeams(teams) {
        // Obtenemos el contenedor de la vista
        const vista = document.getElementById('vista');
        if (!vista) {
            console.error("No se encontró el elemento con id 'vista'");
            return;
        }

        // Limpiamos el contenido previo
        vista.innerHTML = '';

        // Recorrer el array de equipos y agruparlos en filas de 3 columnas
        let row;
        teams.forEach((team, index) => {
            if (index % 3 === 0) {
                // Cada 3 equipos se crea una nueva fila
                row = document.createElement('div');
                row.className = 'row';
            }

            // Crear el div que contendrá la información del equipo
            const col = document.createElement('div');
            col.className = 'col-md-4'; // Usamos clases de Bootstrap para 3 columnas

            // Crear un div interno para el equipo, con estilos opcionales
            const teamDiv = document.createElement('div');
            teamDiv.style.textAlign = 'center'; // Alineación al centro

            // Crear el elemento de imagen del equipo
            const foto = document.createElement('img');
            foto.src = team.strTeamBadge;
            foto.alt = team.strTeam;
            foto.style.width = '100px'; // Ajusta el tamaño según tu diseño
            foto.style.height = 'auto';

            // Crear el elemento con el nombre del equipo
            const nombre = document.createElement('h3');
            nombre.textContent = team.strTeam;

            // Insertamos la imagen y el nombre en el contenedor del equipo
            teamDiv.appendChild(foto);
            teamDiv.appendChild(nombre);

            // Insertamos el contenedor del equipo en la columna y la columna en la fila
            col.appendChild(teamDiv);
            row.appendChild(col);

            // Cada 3 equipos, se añade la fila completa al contenedor principal
            if ((index + 1) % 3 === 0) {
                vista.appendChild(row);
            }
        });

        // Si el número de equipos no es múltiplo de 3, se añade la última fila
        if (teams.length % 3 !== 0) {
            vista.appendChild(row);
        }
    }

    renderPlayers(players) {
        // Obtenemos el contenedor de la vista
        const vista = document.getElementById('vista');
        if (!vista) {
            console.error("No se encontró el elemento con id 'vista'");
            return;
        }

        // Limpiamos el contenido previo
        vista.innerHTML = '';

        // Recorrer el array de jugadores y agruparlos en filas de 3 columnas
        let row;
        players.forEach((player, index) => {
            if (index % 3 === 0) {
                // Cada 3 jugadores se crea una nueva fila
                row = document.createElement('div');
                row.className = 'row';
            }

            // Crear el div que contendrá la información del jugador
            const col = document.createElement('div');
            col.className = 'col-md-4'; // Usamos clases de Bootstrap para 3 columnas

            // Crear un div interno para el jugador, con estilos opcionales
            const playerDiv = document.createElement('div');
            playerDiv.style.textAlign = 'center'; // Alineación al centro

            // Crear el elemento de imagen del jugador
            const foto = document.createElement('img');
            foto.src = player.strPlayerPhoto || 'default-player.png'; // Imagen por defecto si no hay foto
            foto.alt = player.strPlayer;
            foto.style.width = '100px'; // Ajusta el tamaño según tu diseño
            foto.style.height = 'auto';

            // Crear el elemento con el nombre del jugador
            const nombre = document.createElement('h3');
            nombre.textContent = player.strPlayer;

            // Crear el elemento con la posición del jugador
            const posicion = document.createElement('p');
            posicion.textContent = `Posición: ${player.strPosition}`;

            // Insertamos la imagen, el nombre y la posición en el contenedor del jugador
            playerDiv.appendChild(foto);
            playerDiv.appendChild(nombre);
            playerDiv.appendChild(posicion);

            // Insertamos el contenedor del jugador en la columna y la columna en la fila
            col.appendChild(playerDiv);
            row.appendChild(col);

            // Cada 3 jugadores, se añade la fila completa al contenedor principal
            if ((index + 1) % 3 === 0) {
                vista.appendChild(row);
            }
        });
    }
}
export default View;