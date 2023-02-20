import { cleanContainer, showSuccess, showError, createPaginator, pageChanger, datalistCharger } from "./utils.js";
import * as htmlConstants from './htmlConstants.js';
import * as endPoints from './endPoints.js';


export async function initMyPiecePage(){
    createMyPiecePage();

    if(!htmlConstants.internalMenu.classList.contains('d-none')){
        htmlConstants.internalMenu.classList.add('d-none');
    }


    coleccion.dataset.selected = 'todos';
}

export async function createMyPiecePage(selected = 1){
    cleanContainer();

    let coleccion = document.querySelector('#coleccion');
    coleccion.dataset.actualPage = selected;
    coleccion.dataset.type = 'pieces';

    const resultadosPorPagina = 8;
    let pieces = await endPoints.getAllUserParts(selected, resultadosPorPagina);
    coleccion.classList.add('row', 'row-cols-2', 'row-cols-md-3', 'row-cols-lg-4', 'g-2');
    let total = Math.ceil(pieces.count / resultadosPorPagina);
    if(pieces === false){
        showError('Error al obtener las piezas');
    }else{
        pieces.results.forEach(piece => {
            createPieceCard(piece);
        });
        createPaginator(selected, total);
    }
}

export async function createPieceCard(piece){
    let template = document.querySelector('#card-set').content;

    let clon = template.cloneNode(true);

    //image
        clon.querySelector('img').src = piece.part.part_img_url;
        clon.querySelector('img').alt = piece.part.name;
    //name
        clon.querySelector('.title').textContent = piece.part.name;
    
        clon.querySelector('.year').remove();

        clon.querySelector('.num_parts').remove();

        clon.querySelector('.theme_id').remove();        

        let btn = clon.querySelector('.anadir_set_coleccion');
        btn.setAttribute('data-part_num', piece.part.external_ids.BrickLink[0]);
        btn.textContent = 'Perdida';
        btn.addEventListener('click', async (event)=>{
            event.preventDefault();
            console.log(event.target.dataset.part_num)
            let resultado = await endPoints.setLostPart(event.target.dataset.part_num)
            console.log(resultado)
            if(resultado ===201){
                showSuccess('Pieza perdida');
            }else{
                showError('Error al añadir la pieza a la lista de piezas perdidas');
            }
            
        })


        document.querySelector('#coleccion').appendChild(clon);
} 
