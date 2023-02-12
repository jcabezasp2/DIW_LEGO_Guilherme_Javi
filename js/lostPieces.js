import * as htmlConstants from './htmlConstants.js';
import { cleanContainer, showSuccess, showError, createPaginator } from "./utils.js";
import * as endPoints from './endPoints.js';
import { initPiecePage } from './piezas.js';


export async function initLostPiecePage(){
    createLostPiecePage();
}

export async function createLostPiecePage( selected = 1){
    
    cleanContainer();
    const resultadosPorPagina = 12;
    let coleccion = document.querySelector('#coleccion');
    coleccion.dataset.actualPage = selected;
    coleccion.dataset.type = 'lostPieces';
    let pieces = await endPoints.getAllUserLostParts(selected, resultadosPorPagina);
    //TODO implementar error en endpoint
    if(pieces === false){
        showError('Error al obtener las piezas');
    }else{
        pieces.results.forEach(piece => {
            createPieceCard(piece);
        });
        createPaginator(selected);
    }
}

export async function createPieceCard(piece){

    let template = document.querySelector('#card-set').content;

    let clon = template.cloneNode(true);

    //image
        clon.querySelector('img').src = piece.part_img_url;
        clon.querySelector('img').alt = piece.name;
    //name
        clon.querySelector('.title').textContent = piece.name;
    
        clon.querySelector('.year').remove();

        clon.querySelector('.num_parts').remove();

        clon.querySelector('.theme_id').remove();        

        let btn = clon.querySelector('.anadir_set_coleccion');
        
        btn.remove();


        document.querySelector('#coleccion').appendChild(clon);
} 