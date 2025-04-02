const Utils = {
    // Cargar datos desde un archivo JSON
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
    },

    // Guardar el estado actual del modelo en localStorage
    guardarEstadoEnLocalStorage: function (clave, datos) {
        try {
            localStorage.setItem(clave, JSON.stringify(datos));
        } catch (error) {
            console.error("Error al guardar los datos en localStorage:", error);
        }
    },

    // Cargar el estado del modelo desde localStorage
    cargarEstadoDesdeLocalStorage: function (clave) {
        try {
            const datos = localStorage.getItem(clave);
            return datos ? JSON.parse(datos) : null;
        } catch (error) {
            console.error("Error al cargar los datos desde localStorage:", error);
            return null;
        }
    },

    // Limpiar el estado guardado en localStorage
    limpiarEstadoEnLocalStorage: function (clave) {
        try {
            localStorage.removeItem(clave);
            console.log(`Estado eliminado de localStorage para la clave: ${clave}`);
        } catch (error) {
            console.error("Error al eliminar los datos de localStorage:", error);
        }
    },

    // Verificar si hay datos en localStorage
    hayDatosEnLocalStorage: function (clave) {
        try {
            return localStorage.getItem(clave) !== null;
        } catch (error) {
            console.error("Error al verificar los datos en localStorage:", error);
            return false;
        }
    }
};

export default Utils;