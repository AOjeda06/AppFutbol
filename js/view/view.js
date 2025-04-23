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
    <label for="posicion">Posición:</label>
    <select id="posicion" required>
        <option value="Portero">Portero</option>
        <option value="Defensa Central">Defensa Central</option>
        <option value="Lateral Derecho">Lateral Derecho</option>
        <option value="Lateral Izquierdo">Lateral Izquierdo</option>
        <option value="Mediocentro Defensivo">Mediocentro Defensivo</option>
        <option value="Mediocentro Ofensivo">Mediocentro Ofensivo</option>
        <option value="Extremo Derecho">Extremo Derecho</option>
        <option value="Extremo Izquierdo">Extremo Izquierdo</option>
        <option value="Delantero Centro">Delantero Centro</option>
    </select>
    <br>
    <label for="nacimiento">Fecha de Nacimiento:</label>
    <input type="date" id="nacimiento" required>
    <br>
    <label for="liga">Liga:</label>
    <select id="liga" required>
        <!-- Options will be dynamically populated -->
    </select>
    <br>
    <label for="equipo">Equipo:</label>
    <select id="equipo" required>
        <!-- Options will be dynamically populated -->
    </select>
    <br>
    <button type="submit" id="addPlayer">Agregar Jugador</button>
    </form>
    </div>`;

        // Populate leagues dropdown
        const ligaDropdown = document.getElementById("liga");
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

            const equipoDropdown = document.getElementById("equipo");
            equipoDropdown.innerHTML = ""; // Clear existing options
            equiposDeLiga.forEach(equipo => {
                const option = document.createElement("option");
                option.value = equipo.id;
                option.textContent = equipo.name;
                equipoDropdown.appendChild(option);
            });
        });
    }

    createTeamForm() {
        this.view.innerHTML = `<div id="equipo-form">
    <form>
    <h2>Crear Equipo</h2>
    <label for="nombre">Nombre:</label>
    <input type="text" id="nombre" required>
    <br>
    <label for="tla">Abreviatura (TLA):</label>
    <input type="text" id="tla" required>
    <br>
    <label for="crest">URL del Escudo:</label>
    <input type="url" id="crest" required>
    <br>
    <label for="website">Sitio Web:</label>
    <input type="url" id="website" required>
    <br>
    <label for="founded">Año de Fundación:</label>
    <input type="number" id="founded" required>
    <br>
    <label for="clubColors">Colores del Club:</label>
    <input type="text" id="clubColors" required>
    <br>
    <label for="venue">Estadio:</label>
    <input type="text" id="venue" required>
    <br>
    <label for="liga">Liga:</label>
    <select id="liga" required>
        <option value="2021">Premier League</option>
        <option value="2015">La Liga</option>
        <option value="2019">Serie A</option>
        <option value="2002">Bundesliga</option>
        <option value="2015">Ligue 1</option>
    </select>
    <br>
    <button type="submit" id="addTeam">Guardar Equipo</button> 
    </form>
    </div>`;
    }

    createAssociatorForm() {
        this.view.innerHTML = `<div id="asociador-form">
    <form>
    <h2>Asociar Jugador a Equipo</h2>
    <label for="liga">Liga:</label>
    <select id="liga" required>
        <!-- Options will be dynamically populated -->
    </select>
    <br>
    <label for="equipo">Equipo:</label>
    <select id="equipo" required>
        <!-- Options will be dynamically populated -->
    </select>
    <br>
    <label for="jugador-id">ID del Jugador:</label>
    <input type="number" id="jugador-id" required>
    <br>
    <button type="submit" id="addAssociator">Asignar Jugador</button>
    </form>
    </div>`;
    }

    createDeletePlayerForm() {
        this.view.innerHTML = `<div id="borrar-form">
    <form>
    <h2>Borrar Jugador</h2>
    <label>ID Jugador:</label>
    <input type="number" id="jugador-id" required>
    <button type="submit" id="deletePlayer">Borrar Jugador</button>
    </form>
    </div>`;
    }
    createDeleteTeamForm() {
        this.view.innerHTML = `<div id="borrar-form">
    <form>
    <h2>Borrar Equipo</h2>
    <label>ID Equipo:</label>
    <input type="number" id="equipo-id" required>
    <button type="submit" id="deleteTeam">Borrar Eqiupo</button>
    </form>
    </div>`;
    }
    createSearchTeamForm() {
        this.view.innerHTML = `<div id="buscar-equipo-form">
    <form>
    <h2>Buscar Equipo</h2>
    <label for="equipo-nombre">Nombre del Equipo:</label>
    <input type="text" id="equipo-nombre" required>
    <button type="submit" id="searchTeam">Buscar Equipo</button>
    </form>
    </div>`;
    }

    createSearchPlayerForm() {
        this.view.innerHTML = `<div id="buscar-jugador-form">
    <form>
    <h2>Buscar Jugador</h2>
    <label for="jugador-nombre">Nombre del Jugador:</label>
    <input type="text" id="jugador-nombre" required>
    <button type="submit" id="searchPlayer">Buscar Jugador</button>
    </form>
    </div>`;
    }

    createLeagueSelectionForm() {
        this.view.innerHTML = `<div id="liga-form">
    <form>
    <h2>Seleccionar Liga</h2>
    <label for="liga">Liga:</label>
    <select id="liga" required>
        <option value="2021">Premier League</option> <!-- ID predefinido -->
        <option value="2014">La Liga</option> <!-- ID predefinido -->
        <option value="2019">Serie A</option> <!-- ID predefinido -->
        <option value="2002">Bundesliga</option> <!-- ID predefinido -->
        <option value="2015">Ligue 1</option> <!-- ID predefinido -->
    </select>
    <br>
    <button type="button" id="showTeams">Mostrar Equipos</button>
    </form>
    </div>`;
    }

    createFilterPlayersByTeamForm() {
        const vista = document.getElementById("vista");
        vista.innerHTML = `
        <form id="filterPlayersForm">
        <h2>Filtrar Jugadores por Equipo</h2>
                <label for="equipo-id">ID del Equipo:</label>
                <input type="number" id="equipo-id" required>
                <button type="button" id="filterPlayers">Filtrar</button>
            </form>
            <div id="filteredPlayers"></div>
        `;
    }

    createFilterPlayersByPositionForm() {
        this.view.innerHTML = `<div id="filtrar-posicion-form">
    <form>
    <h2>Filtrar Jugadores por Posición</h2>
    <label for="posicion">Posición:</label>
    <select id="posicion" required>
        <option value="Goalkeeper">Goalkeeper</option>
        <option value="Defence">Defence</option>
        <option value="Midfield">Midfield</option>
        <option value="Offence">Offence</option>
        <option value="Centre-Back">Centre-Back</option>
        <option value="Centre-Forward">Centre-Forward</option>
        <option value="Right-Back">Right-Back</option>
        <option value="Left-Back">Left-Back</option>
        <option value="Attacking Midfield">Attacking Midfield</option>
        <option value="Central Midfield">Central Midfield</option>
        <option value="Right Winger">Right Winger</option>
        <option value="Right Midfield">Right Midfield</option>
        <option value="Left Winger">Left Winger</option>
    </select>
    <br>
    <button type="button" id="filterByPosition">Filtrar</button>
    </form>
    </div>`;
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
        const tla = document.getElementById("tla").value;
        const crest = document.getElementById("crest").value;
        const website = document.getElementById("website").value;
        const founded = document.getElementById("founded").value;
        const clubColors = document.getElementById("clubColors").value;
        const venue = document.getElementById("venue").value;
        const liga = document.getElementById("liga").value;
        team.push(nombre, tla, crest, website, founded, clubColors, venue, liga);
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
            foto.src = team.crest || 'img/default-team.png'; // Usa el atributo crest o una imagen por defecto
            foto.alt = team.name || 'Equipo desconocido'; // Texto alternativo
            foto.style.width = '100px'; // Ajusta el tamaño según tu diseño
            foto.style.height = 'auto';

            // Añadir evento para mostrar información en un dialog
            foto.addEventListener('click', () => {
                const dialog = document.createElement('dialog');
                dialog.className = 'dialog';
                dialog.innerHTML = `
                    <h2>${team.name || 'Equipo desconocido'}</h2>
                    <p><strong>ID del Equipo:</strong> ${team.id || 'N/A'}</p> <!-- Added team ID -->
                    <p><strong>Abreviatura (TLA):</strong> ${team.tla || 'N/A'}</p>
                    <p><strong>Fundación:</strong> ${team.founded || 'N/A'}</p>
                    <p><strong>Colores del Club:</strong> ${team.clubColors || 'N/A'}</p>
                    <p><strong>Estadio:</strong> ${team.venue || 'N/A'}</p>
                    <p><strong>Sitio Web:</strong> <a href="${team.website}" target="_blank">${team.website || 'N/A'}</a></p>
                    <button id="closeDialog">Cerrar</button>
                `;
                document.body.appendChild(dialog);
                dialog.showModal();

                // Cerrar el dialog
                dialog.querySelector('#closeDialog').addEventListener('click', () => {
                    dialog.close();
                    dialog.remove();
                });
            });

            // Crear el elemento con el nombre del equipo
            const nombre = document.createElement('h3');
            nombre.textContent = team.name || 'Equipo desconocido';

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

    renderTeamsByLeague(teams) {
        // Render teams filtered by league
        const vista = document.getElementById('vista');
        if (!vista) {
            console.error("No se encontró el elemento con id 'vista'");
            return;
        }

        vista.innerHTML = '';

        let row;
        teams.forEach((team, index) => {
            if (index % 3 === 0) {
                row = document.createElement('div');
                row.className = 'row';
            }

            const col = document.createElement('div');
            col.className = 'col-md-4';

            const teamDiv = document.createElement('div');
            teamDiv.style.textAlign = 'center';

            const foto = document.createElement('img');
            foto.src = team.strTeamBadge;
            foto.alt = team.strTeam;
            foto.style.width = '100px';
            foto.style.height = 'auto';

            const nombre = document.createElement('h3');
            nombre.textContent = team.strTeam;

            teamDiv.appendChild(foto);
            teamDiv.appendChild(nombre);

            col.appendChild(teamDiv);
            row.appendChild(col);

            if ((index + 1) % 3 === 0) {
                vista.appendChild(row);
            }
        });

        if (teams.length % 3 !== 0) {
            vista.appendChild(row);
        }
    }

    renderPlayers(players, equipos) {
        const vista = document.getElementById('vista');
        if (!vista) {
            console.error("No se encontró el elemento con id 'vista'");
            return;
        }

        vista.innerHTML = '';

        let row;
        players.forEach((player, index) => {
            if (index % 3 === 0) {
                row = document.createElement('div');
                row.className = 'row';
            }

            const col = document.createElement('div');
            col.className = 'col-md-4';

            const playerDiv = document.createElement('div');
            playerDiv.style.textAlign = 'center';

            const foto = document.createElement('img');
            foto.src = player.photo || 'img/default-player.png'; // Usar imagen por defecto si no hay foto
            foto.alt = player.name || 'Jugador desconocido';
            foto.onerror = () => { foto.src = 'img/default-player-image.png'; }; // Imagen por defecto si falla la carga
            foto.style.width = '100px';
            foto.style.height = 'auto';

            foto.addEventListener('click', () => {
                const dialog = document.createElement('dialog');
                dialog.className = 'dialog';

                // Fetch team name from localStorage using the team ID
                const equipos = JSON.parse(localStorage.getItem('equipos')) || [];
                const equipo = equipos.find(e => e.id === player.equipoId);
                const equipoNombre = equipo ? equipo.name : 'Equipo desconocido';

                dialog.innerHTML = `
                    <h2>${player.name || 'Jugador desconocido'}</h2>
                    <p><strong>ID del Jugador:</strong> ${player.id || 'N/A'}</p>
                    <p><strong>Posición:</strong> ${player.position || 'N/A'}</p>
                    <p><strong>Fecha de Nacimiento:</strong> ${player.dateOfBirth || 'N/A'}</p>
                    <p><strong>Nacionalidad:</strong> ${player.nationality || 'N/A'}</p>
                    <p><strong>Equipo:</strong> ${equipoNombre}</p>
                    <button id="closeDialog">Cerrar</button>
                `;

                document.body.appendChild(dialog);
                dialog.showModal();

                // Cerrar el dialog
                dialog.querySelector('#closeDialog').addEventListener('click', () => {
                    dialog.close();
                    dialog.remove();
                });
            });

            const nombre = document.createElement('h3');
            nombre.textContent = player.name || 'Jugador desconocido';

            const posicion = document.createElement('p');
            posicion.textContent = `Posición: ${player.position || 'N/A'}`;

            playerDiv.appendChild(foto);
            playerDiv.appendChild(nombre);
            playerDiv.appendChild(posicion);

            col.appendChild(playerDiv);
            row.appendChild(col);

            if ((index + 1) % 3 === 0) {
                vista.appendChild(row);
            }
        });

        if (players.length % 3 !== 0) {
            vista.appendChild(row);
        }
    }

    renderPlayersByTeam(players) {
        const vista = document.getElementById('vista');
        if (!vista) {
            console.error("No se encontró el elemento con id 'vista'");
            return;
        }

        vista.innerHTML = '';

        let row;
        players.forEach((player, index) => {
            if (index % 3 === 0) {
                row = document.createElement('div');
                row.className = 'row';
            }

            const col = document.createElement('div');
            col.className = 'col-md-4';

            const playerDiv = document.createElement('div');
            playerDiv.style.textAlign = 'center';

            const foto = document.createElement('img');
            foto.src = player.photo || 'img/default-player.png'; // Usar imagen por defecto si no hay foto
            foto.alt = player.name || 'Jugador desconocido';
            foto.onerror = () => { foto.src = 'img/default-player.png'; }; // Imagen por defecto si falla la carga
            foto.style.width = '100px';
            foto.style.height = 'auto';

            const nombre = document.createElement('h3');
            nombre.textContent = player.name || 'Jugador desconocido';

            const posicion = document.createElement('p');
            posicion.textContent = `Posición: ${player.position || 'N/A'}`;

            playerDiv.appendChild(foto);
            playerDiv.appendChild(nombre);
            playerDiv.appendChild(posicion);

            col.appendChild(playerDiv);
            row.appendChild(col);

            if ((index + 1) % 3 === 0) {
                vista.appendChild(row);
            }
        });

        if (players.length % 3 !== 0) {
            vista.appendChild(row);
        }
    }

    renderFilteredPlayers(players) {
        const container = document.getElementById("filteredPlayers");
        container.innerHTML = players.length
            ? players.map(player => `<p>${player.name} - ${player.position}</p>`).join("")
            : "<p>No se encontraron jugadores para este equipo.</p>";
    }

    renderPlayerDetails(player) {
        const vista = document.getElementById('vista');
        if (!vista) {
            console.error("No se encontró el elemento con id 'vista'");
            return;
        }

        vista.innerHTML = '';

        const playerDiv = document.createElement('div');
        playerDiv.style.textAlign = 'center';

        const foto = document.createElement('img');
        foto.src = player.photo || 'img/default-player.png'; // Usar imagen por defecto si no hay foto
        foto.alt = player.name || 'Jugador desconocido';
        foto.onerror = () => { foto.src = 'img/default-player.png'; }; // Imagen por defecto si falla la carga
        foto.style.width = '150px';
        foto.style.height = 'auto';

        const nombre = document.createElement('h2');
        nombre.textContent = player.name || 'Jugador desconocido';

        const posicion = document.createElement('p');
        posicion.textContent = `Posición: ${player.position || 'N/A'}`;

        const equipo = document.createElement('p');
        equipo.textContent = `Equipo: ${player.team || 'N/A'}`;

        playerDiv.appendChild(foto);
        playerDiv.appendChild(nombre);
        playerDiv.appendChild(posicion);
        playerDiv.appendChild(equipo);

        vista.appendChild(playerDiv);
    }

    renderTeamDetails(team) {
        // Render details of a single team
        const vista = document.getElementById('vista');
        if (!vista) {
            console.error("No se encontró el elemento con id 'vista'");
            return;
        }

        vista.innerHTML = '';

        const teamDiv = document.createElement('div');
        teamDiv.style.textAlign = 'center';

        const foto = document.createElement('img');
        foto.src = team.strTeamBadge;
        foto.alt = team.strTeam;
        foto.style.width = '150px';
        foto.style.height = 'auto';

        const nombre = document.createElement('h2');
        nombre.textContent = team.strTeam;

        const ciudad = document.createElement('p');
        ciudad.textContent = `Ciudad: ${team.strCity}`;

        const estadio = document.createElement('p');
        estadio.textContent = `Estadio: ${team.strStadium}`;

        const liga = document.createElement('p');
        liga.textContent = `Liga: ${team.strLeague}`;

        teamDiv.appendChild(foto);
        teamDiv.appendChild(nombre);
        teamDiv.appendChild(ciudad);
        teamDiv.appendChild(estadio);
        teamDiv.appendChild(liga);

        vista.appendChild(teamDiv);
    }
}

export default View;