import FootballDataApi from './api/footballDataApi.js';

(async function () {
    console.log("Iniciando prueba básica de la API...");

    try {
        const ligas = await FootballDataApi.obtenerLiga(39); // Premier League
        console.log("Ligas recibidas:", ligas);
    } catch (error) {
        console.error("Error al realizar la prueba básica con la API:", error);
    }   const ligaDatos = await FootballDataApi.obtenerLiga(ligaId); catch (error) {
})();   console.log("Datos de la liga recibidos:", ligaDatos);   console.error("Error al realizar la prueba básica con la API:", error);











})();    }        console.error("Error al realizar la prueba con la API:", error);    } catch (error) {        console.log("Prueba completada. Revisa los datos en la consola.");        console.log("Partidos de la liga recibidos:", partidos);        const partidos = await FootballDataApi.obtenerPartidos(ligaId, temporada);        console.log("Equipos de la liga recibidos:", equipos);