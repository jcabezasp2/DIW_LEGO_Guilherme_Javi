import { cleanContainer, showSuccess, showError, createPaginator, pageChanger} from "./utils.js";
import * as htmlConstants from './htmlConstants.js';
import * as endPoints from './endPoints.js';


export async function initSetPage(){
    createSetPage();
}

export async function createSetPage(selected = 1){
    cleanContainer();
    const resultadosPorPagina = 8;
    let coleccion = document.querySelector('#coleccion');
    coleccion.dataset.actualPage = selected;
    coleccion.dataset.type = 'sets';
    let sets = await endPoints.getSets(selected, resultadosPorPagina);

    coleccion.classList.add('row', 'row-cols-2', 'row-cols-md-3', 'row-cols-lg-4', 'g-2');

    if(sets === false){
        showError('Error al obtener los sets');
    }else{
        sets.results.forEach(set => {
            createSetCard(set);
        });
        createPaginator(selected);     
    }
}

export async function createSetCard(set){

    let template = document.querySelector('#card-set').content;

    let clon = template.cloneNode(true);
 
    //image
    if(set.set_img_url != null){
        
        clon.querySelector('img').src = set.set_img_url;
        clon.querySelector('img').alt = set.name;
        
    }else{
        
        clon.querySelector('img').src = "img/bloc.png";
        
    }
    //name
        clon.querySelector('.title').textContent = set.name;
    //year
        clon.querySelector('.year').textContent = "Año de lanzamiento: " + set.year;
    //num_parts
        clon.querySelector('.num_parts').textContent = "Número de piezas: " + set.num_parts;
    //theme_id
        let themeName = await endPoints.getTheme(set.theme_id);
        clon.querySelector('.theme_id').textContent = themeName.name;
    //Boton añadir a la coleccion
        let btn = clon.querySelector('.anadir_set_coleccion');

        btn.setAttribute('data-set_id', set.set_num);
        btn.addEventListener('click', async (event)=>{
            event.preventDefault();
            let resultado = await endPoints.setUserSet(event.target.dataset.set_id)
            if(resultado ===201){
                showSuccess('Set añadido a la coleccion');
            }else{
                showError('Error al añadir el set a la coleccion');
            }
            
        })

        document.querySelector('#coleccion').appendChild(clon);
}
