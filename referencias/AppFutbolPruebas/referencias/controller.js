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
    }
};