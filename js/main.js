import * as htmlConstants from './htmlConstants.js';
import * as endPoints from './endPoints.js';
import * as setsFunctions from './sets.js';
import * as piecesFunctions from './piezas.js';
import * as personalFunctions from './lostPieces.js';
//Ejemplo de llamada a un endpoint
//console.log(await endPoints.getThemes(1, 10));

window.addEventListener('load', init);

function init(){

    logo.addEventListener('click', ()=>{
        location.reload();
    })

    inicio.addEventListener('click', ()=>{
        location.reload();
    })

    htmlConstants.sets.forEach(set => { 
        set.addEventListener('click', setsFunctions.initSetPage);
    });

    htmlConstants.piezas.forEach(pieza => {
        pieza.addEventListener('click', piecesFunctions.initPiecePage);
    });

    htmlConstants.perdidas.forEach(perdida => {
        perdida.addEventListener('click', personalFunctions.initLostPiecePage);
    });

}

