import * as htmlConstants from './htmlConstants.js';
import { cleanContainer, showSuccess, showError, createPaginator } from "./utils.js";
import * as endPoints from './endPoints.js';
import { initPiecePage } from './pieces.js';


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
    coleccion.classList.add('row', 'row-cols-2', 'row-cols-md-3', 'row-cols-lg-4', 'g-2');
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
        clon.querySelector('img').src = piece.inv_part.part.part_img_url;
        clon.querySelector('img').alt = piece.inv_part.part.name;
    //name
        clon.querySelector('.title').textContent = piece.inv_part.part.name;
    
        clon.querySelector('.year').remove();

        clon.querySelector('.num_parts').remove();

        clon.querySelector('.theme_id').remove();        

        let btn = clon.querySelector('.anadir_set_coleccion');
        
        btn.remove();


        document.querySelector('#coleccion').appendChild(clon);
} 