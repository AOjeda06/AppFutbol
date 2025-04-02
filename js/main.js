import Model from './model/model.js';

(async function () {
    await Model.inicializar();

    // Cargar datos desde la API solo si no hay datos en localStorage
    const estadoGuardado = localStorage.getItem('estadoApp');
    if (!estadoGuardado) {
        await Model.cargarDatosDesdeAPI();
    }

    console.log('Aplicación inicializada.');
})();
