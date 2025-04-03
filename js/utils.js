const Utils = {
    /**
     *
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
    },

    /**
     * Guardar el estado actual del modelo en localStorage.
     * @param {string} clave - Clave para identificar los datos.
     * @param {Object} datos - Datos a guardar.
     */
    guardarEstadoEnLocalStorage: function (clave, datos) {
        try {
            localStorage.setItem(clave, JSON.stringify(datos));
        } catch (error) {
            console.error("Error al guardar los datos en localStorage:", error);
        }
    },

    /**
     * Cargar el estado del modelo desde localStorage.
     * @param {string} clave - Clave para identificar los datos.
     * @returns {Object|null} Datos cargados o null si no existen.
     */
    cargarEstadoDesdeLocalStorage: function (clave) {
        try {
            const datos = localStorage.getItem(clave);
            return datos ? JSON.parse(datos) : null;
        } catch (error) {
            console.error("Error al cargar los datos desde localStorage:", error);
            return null;
        }
    },

    /**
     * Limpiar el estado guardado en localStorage.
     * @param {string} clave - Clave para identificar los datos.
     */
    limpiarEstadoEnLocalStorage: function (clave) {
        try {
            localStorage.removeItem(clave);
            console.log(`Estado eliminado de localStorage para la clave: ${clave}`);
        } catch (error) {
            console.error("Error al eliminar los datos de localStorage:", error);
        }
    },

    /**
     * Verificar si hay datos en localStorage.
     * @param {string} clave - Clave para identificar los datos.
     * @returns {boolean} True si existen datos, false en caso contrario.
     */
    hayDatosEnLocalStorage: function (clave) {
        try {
            return localStorage.getItem(clave) !== null;
        } catch (error) {
            console.error("Error al verificar los datos en localStorage:", error);
            return false;
        }
    }
};

/**
 * Función para formatear una fecha en formato legible.
 * @param {Date} fecha - Objeto de fecha.
 * @returns {string} Fecha formateada en formato "DD/MM/YYYY".
 */
export function formatearFecha(fecha) {
    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Los meses van de 0 a 11
    const anio = fecha.getFullYear();
    return `${dia}/${mes}/${anio}`;
}

/**
 * Función para calcular la diferencia en días entre dos fechas.
 * @param {Date} fechaInicio - Fecha inicial.
 * @param {Date} fechaFin - Fecha final.
 * @returns {number} Diferencia en días.
 */
export function calcularDiferenciaDias(fechaInicio, fechaFin) {
    const unDia = 24 * 60 * 60 * 1000; // Milisegundos en un día
    return Math.round((fechaFin - fechaInicio) / unDia);
}

/**
 * Función para generar un ID único.
 * @returns {string} ID único generado.
 */
export function generarIdUnico() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

export default Utils;