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

            for (const { ruta } of archivosEquipos) {
                try {
                    console.log(`Intentando cargar: ${window.location.origin}/${ruta}`);
                    const respuesta = await fetch(ruta);
                    if (!respuesta.ok) {
                        throw new Error(`Archivo no encontrado: ${ruta}`);
                    }
                    const datos = await respuesta.json();
                    Model.cargarDatosIniciales(datos); // Cargar directamente en el modelo
                    console.log(`Datos iniciales cargados desde ${ruta}.`);
                } catch (error) {
                    console.error(`Error al cargar el archivo JSON: ${ruta}`, error);
                }
            }
        };

        // Paso 1: Cargar datos iniciales desde archivos JSON
        await cargarDatosInicialesDesdeArchivos();

        console.log("Proceso completado.");
    } catch (error) {
        console.error("Error al cargar los datos:", error);
    }
})();