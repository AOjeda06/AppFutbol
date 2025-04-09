import Model from '../js/model/model.js';

(async function () {
    console.log("Iniciando la obtención de datos...");

    try {
        // Función para cargar datos iniciales desde archivos JSON
        const cargarDatosInicialesDesdeArchivos = async () => {
            const archivosEquipos = [
                { clave: 'SerieA', ruta: 'js/model/DatosIniciales/SerieA.json' },
                { clave: 'Premier', ruta: 'js/model/DatosIniciales/Premier.json' },
                { clave: 'LaLiga', ruta: 'js/model/DatosIniciales/LaLiga.json' },
                { clave: 'Bundesliga', ruta: 'js/model/DatosIniciales/Bundesliga.json' },
                { clave: 'Ligue1', ruta: 'js/model/DatosIniciales/Ligue1.json' }
            ];

            for (const { clave, ruta } of archivosEquipos) {
                try {
                    console.log(`Intentando cargar: ${window.location.origin}/${ruta}`);
                    const respuesta = await fetch(ruta);
                    if (!respuesta.ok) {
                        throw new Error(`Archivo no encontrado: ${ruta}`);
                    }
                    const datos = await respuesta.json();
                    localStorage.setItem(clave, JSON.stringify(datos));
                    console.log(`Datos iniciales de ${clave} guardados en localStorage.`);
                } catch (error) {
                    console.error(`Error al cargar el archivo JSON: ${ruta}`, error);
                }
            }
        };

        // Paso 1: Cargar datos iniciales desde archivos JSON
        await cargarDatosInicialesDesdeArchivos();

        // Paso 2: Cargar los datos iniciales en el modelo
        const archivosEquipos = ['SerieA', 'Premier', 'LaLiga', 'Bundesliga', 'Ligue1'];
        for (const clave of archivosEquipos) {
            const datosLiga = JSON.parse(localStorage.getItem(clave));
            if (datosLiga) {
                Model.cargarDatosIniciales(datosLiga); // Pasar el objeto completo
                console.log(`Datos iniciales de ${clave} cargados en el modelo.`);
            } else {
                console.warn(`No se encontraron datos para ${clave} en localStorage.`);
            }
        }

        console.log("Proceso completado.");
    } catch (error) {
        console.error("Error al cargar los datos:", error);
    }
})();