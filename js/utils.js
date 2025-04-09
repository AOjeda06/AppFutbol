const Utils = {
    /**
     * Cargar datos desde un archivo JSON.
     * @param {string} rutaArchivo - Ruta del archivo JSON.
     * @returns {Promise<Object|null>} Datos cargados o null en caso de error.
     */
    cargarDatosDesdeJSON: async function (rutaArchivo) {
        try {
            const respuesta = await fetch(rutaArchivo);
            if (!respuesta.ok) {
                throw new Error(`Error al cargar el archivo JSON: ${respuesta.statusText}`);
            }
            const datos = await respuesta.json();
            return datos;
        } catch (error) {
            console.error("Error al cargar los datos desde el archivo JSON:", error);
            return null;
        }
    }
};

export default Utils;