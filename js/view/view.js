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
    <br>
    <button type="button">Enviar</button>
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
    <br>
    <button type="button">Enviar</button>
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
    <button type="button">Asociar</button>
    </div>`
    }

    renderTeams() {
        teams = [
            { strTeam: "Barcelona", strTeamBadge: "https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg" },
            { strTeam: "Real Madrid", strTeamBadge: "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg" },
            { strTeam: "Atlético de Madrid", strTeamBadge: "https://upload.wikimedia.org/wikipedia/en/6/6f/Atl%C3%A9tico_de_Madrid_logo.svg" },
            { strTeam: "Manchester United", strTeamBadge: "https://upload.wikimedia.org/wikipedia/en/d/da/Manchester_United_FC_crest.svg" },
            { strTeam: "Liverpool", strTeamBadge: "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC_logo.svg" },
            { strTeam: "Chelsea", strTeamBadge: "https://upload.wikimedia.org/wikipedia/en/c/c3/Chelsea_FC.svg" },
            { strTeam: "Bayern Munich", strTeamBadge: "https://upload.wikimedia.org/wikipedia/en/b/ba/FC_Bayern_Munich_logo.svg" },
            { strTeam: "Paris Saint-Germain", strTeamBadge: "https://upload.wikimedia.org/wikipedia/en/e/e7/Paris_Saint-Germain_F.C..svg" }
        ]

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
}
export default View;