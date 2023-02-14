import { cleanContainer, showSuccess, showError, createPaginator, pageChanger } from "./utils.js";
import * as htmlConstants from './htmlConstants.js';
import * as endPoints from './endPoints.js';


export async function initMySetsPage(){
    createMySetsPage();
}

export async function createMySetsPage(selected = 1){
    cleanContainer();
    const resultadosPorPagina = 12;

    let coleccion = document.querySelector('#coleccion');
    coleccion.dataset.actualPage = selected;
    coleccion.dataset.type = 'mySets';

    let misets = await endPoints.getAllUserSets(selected, resultadosPorPagina); 
    coleccion.classList.add('row', 'row-cols-2', 'row-cols-md-3', 'row-cols-lg-4', 'g-2');

    if( misets === false){
        showError('Error al obtener los sets');
    }else{
        misets.results.forEach( miset => {
            createMySetCard(miset);
        });
        createPaginator(selected);
    }
}

export async function createMySetCard( miset){
    let template = document.querySelector('#card-set').content;
    let clon = template.cloneNode(true);
    console.log(miset)
    //image
    clon.querySelector('img').src = miset.set_img_url;
    clon.querySelector('img').alt = miset.name;
    //name
    clon.querySelector('.title').textContent =  miset.name;
    //year
    clon.querySelector('.year').textContent =  miset.year;
    //num_parts
    clon.querySelector('.num_parts').textContent =  miset.num_parts;
    //theme_id
    clon.querySelector('.theme_id').remove();     
    //btn

    let btn = clon.querySelector('.anadir_set_coleccion').textContent = 'Eliminar de la colección';

    document.querySelector('#coleccion').appendChild(clon);
}