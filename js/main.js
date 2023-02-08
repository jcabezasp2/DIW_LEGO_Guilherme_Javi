
import * as endPoints from './endPoints.js';
//Ejemplo de llamada a un endpoint
//console.log(await endPoints.getThemes(1, 10));

const container = document.querySelector('.container');
const inicio = document.querySelector('#inicio');
const sets = document.querySelector('#sets');
const piezas = document.querySelector('#piezas');
const logo = document.querySelector('#logo');
const modal = document.querySelector('#modal');

window.addEventListener('load', init);

function init(){

    inicio.addEventListener('click', ()=>{
        location.reload();
    })

    sets.addEventListener('click', ()=>{
        createSetPage();
    });



}

function cleanContainer(){
    
    container.innerHTML = '';
}

async function createSetPage(){
    cleanContainer();
    let sets = await endPoints.getSets(1, 10);

    if(sets === false){
        showError('Error al obtener los sets');
    }else{
        sets.results.forEach(set => {
            createSetCard(set);
        });
    }
}

async function createSetCard(set){
console.log(set)
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

    container.appendChild(clon);
}

function showError(mensaje){

}
