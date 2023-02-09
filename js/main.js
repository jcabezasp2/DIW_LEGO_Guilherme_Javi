
import * as endPoints from './endPoints.js';
//Ejemplo de llamada a un endpoint
//console.log(await endPoints.getThemes(1, 10));


const container = document.querySelector('.container');
const inicio = document.querySelector('#inicio');
const sets = document.querySelectorAll('.sets');
const piezas = document.querySelectorAll('.piezas');
const logo = document.querySelector('#logo');
const modal = document.querySelector('#modal');

window.addEventListener('load', init);

function init(){

    logo.addEventListener('click', ()=>{
        location.reload();
    })

    inicio.addEventListener('click', ()=>{
        location.reload();
    })

    sets.forEach(set => { 
        set.addEventListener('click', createSetPage);
    });

    piezas.forEach(pieza => {
        pieza.addEventListener('click', createPiecePage);
    });

}

function cleanContainer(){
    
    container.innerHTML = '';
    let div = document.createElement('div');
    div.setAttribute('id', 'coleccion');
    container.appendChild(div);

}

async function createSetPage(){
    cleanContainer();
    let sets = await endPoints.getSets(1, 10);

    document.querySelector('#coleccion').classList.add('row', 'row-cols-2', 'row-cols-md-4', 'row-cols-lg-5', 'g-2');

    if(sets === false){
        showError('Error al obtener los sets');
    }else{
        sets.results.forEach(set => {
            createSetCard(set);
        });
    }
}

async function createPiecePage(){
    cleanContainer();
    let pieces = await endPoints.getPieces(10, 10);
    document.querySelector('#coleccion').classList.add('row', 'row-cols-2', 'row-cols-md-4', 'row-cols-lg-5', 'g-2');

    if(pieces === false){
        showError('Error al obtener las piezas');
    }else{
        pieces.results.forEach(piece => {
            createPieceCard(piece);
        });
    }
}

async function createSetCard(set){

    let template = document.querySelector('#card-set').content;

    let clon = template.cloneNode(true);
 
    //image
        clon.querySelector('img').src = set.set_img_url;
        clon.querySelector('img').alt = set.name;
    //name
        clon.querySelector('.title').textContent = set.name;
    //year
        clon.querySelector('.year').textContent = set.year;
    //num_parts
        clon.querySelector('.num_parts').textContent = set.num_parts;
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

async function createPieceCard(piece){

    let template = document.querySelector('#card-set').content;

    let clon = template.cloneNode(true);

    //image
        clon.querySelector('img').src = piece.part_img_url;
        clon.querySelector('img').alt = piece.name;
    //name
        clon.querySelector('.title').textContent = piece.name;
    
        clon.querySelector('.year').textContent = piece.year;

        clon.querySelector('.num_parts').remove();

        clon.querySelector('.theme_id').remove();        

        let btn = clon.querySelector('.anadir_set_coleccion');
        
        btn.remove();


        document.querySelector('#coleccion').appendChild(clon);
}        

function showError(mensaje){

    let div = document.createElement('div');
    div.setAttribute('role', 'alert');
    div.setAttribute('id', 'alert');
    div.classList.add('alert', 'alert-danger');
    div.textContent = mensaje;
    container.appendChild(div);

    setTimeout(()=>{
        div.remove();
    }, 3000);
   
}

function showSuccess(mensaje){

    let div = document.createElement('div');
    div.setAttribute('role', 'alert');
    div.setAttribute('id', 'alert');
    div.classList.add('alert', 'alert-success');
    div.textContent = mensaje;
    container.appendChild(div);

    setTimeout(()=>{
        div.remove();
    }, 3000);

}
