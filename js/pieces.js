import { cleanContainer, showSuccess, showError, createPaginator, pageChanger, datalistCharger } from "./utils.js";
import * as htmlConstants from './htmlConstants.js';
import * as endPoints from './endPoints.js';


export async function initPiecePage(){
    createPiecePage();

    if(!htmlConstants.internalMenu.classList.contains('d-none')){
        htmlConstants.internalMenu.classList.add('d-none');
    }

    coleccion.dataset.selected = 'todos';
}

export async function createPiecePage(selected = 1){
    cleanContainer();

    let coleccion = document.querySelector('#coleccion');
    coleccion.dataset.actualPage = selected;
    coleccion.dataset.type = 'pieces';

    const resultadosPorPagina = 8;
    let pieces = await endPoints.getPieces(selected, resultadosPorPagina);
    coleccion.classList.add('row', 'row-cols-2', 'row-cols-md-3', 'row-cols-lg-4', 'g-2');

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
    
    if(piece.part_img_url != null){

        clon.querySelector('img').src = piece.part_img_url;
        clon.querySelector('img').alt = piece.name;
        
    }else{
       
        clon.querySelector('img').src = "https://via.placeholder.com/150?text=Imagen%20de%20pieza%20no%20disponible";
        
        
    }
    //name
        clon.querySelector('.title').textContent = piece.name;
    
        clon.querySelector('.year').remove();

        clon.querySelector('.num_parts').remove();

        clon.querySelector('.theme_id').remove();        

        let btn = clon.querySelector('.anadir_set_coleccion');
        
        btn.remove();


        document.querySelector('#coleccion').appendChild(clon);
} 


