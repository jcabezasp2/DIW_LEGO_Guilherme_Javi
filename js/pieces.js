import { cleanContainer, showSuccess, showError, createPaginator, pageChanger, datalistCharger } from "./utils.js";
import * as htmlConstants from './htmlConstants.js';
import * as endPoints from './endPoints.js';


export async function initPiecePage(){
    createPiecePage();
    createMenu();
    coleccion.dataset.selected = 'todos';
    htmlConstants.selected.addEventListener('change', (event)=>{
        coleccion.dataset.selected = event.target.value;
    });
}

export async function createPiecePage(selected = 10){
    cleanContainer();

    let coleccion = document.querySelector('#coleccion');
    coleccion.dataset.actualPage = selected;
    coleccion.dataset.type = 'pieces';

    const resultadosPorPagina = 12;
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
        clon.querySelector('img').src = "img/pieza.png";
        
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


async function createMenu(){
    htmlConstants.internalMenu.classList.remove('d-none');
    let themes = await endPoints.getAllThemes();
    datalistCharger(themes);
}

