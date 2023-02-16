import { cleanContainer, showSuccess, showError, createPaginator, pageChanger } from "./utils.js";
import * as htmlConstants from './htmlConstants.js';
import * as endPoints from './endPoints.js';


export async function initMySetsPage(){
    createMySetsPage();
}

export async function createMySetsPage(selected = 1){
    cleanContainer();
    const resultadosPorPagina = 8;

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

    //image
    if(miset.set.set_img_url != null){

        clon.querySelector('img').src = miset.set.set_img_url;
        clon.querySelector('img').alt = miset.set.name;

    }else{
        clon.querySelector('img').src = "https://via.placeholder.com/150?text=Imagen%20de%20set%20no%20disponible";
    }
    //name
    clon.querySelector('.title').textContent =  miset.set.name;
    //year
    clon.querySelector('.year').textContent = "Año de lanzamiento: " + miset.set.year;
    //num_parts
    clon.querySelector('.num_parts').textContent = "Número de piezas: " + miset.set.num_parts;
    //theme_id
    clon.querySelector('.theme_id').remove();     
    //btn
    clon.querySelector('.anadir_set_coleccion').textContent = 'Eliminar de la colección';

    let btn = clon.querySelector('.anadir_set_coleccion');
    btn.setAttribute('data-set_id', miset.set.set_num);
    btn.addEventListener('click', async (event)=>{
        let set_id = event.target.dataset.set_id;
        let result = await endPoints.deleteUserSet(set_id);
        if(result === false){
            showError('Error al eliminar el set de la colección');
        }else{
            showSuccess('Set eliminado de la colección');
            createMySetsPage();
        }
    });



    document.querySelector('#coleccion').appendChild(clon);
}