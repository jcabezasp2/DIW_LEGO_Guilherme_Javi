import * as htmlConstants from './htmlConstants.js';
import {createSetPage} from './sets.js';
import {createPiecePage} from './pieces.js';
import {createMySetsPage} from './mySets.js';
import * as endPoints from './endPoints.js';

export function cleanContainer(){
    
    htmlConstants.container.innerHTML = '';
    let div = document.createElement('div');
    div.setAttribute('id', 'coleccion');
    htmlConstants.container.appendChild(div);

}

export function showError(mensaje){

    let div = document.createElement('div');
    div.setAttribute('role', 'alert');
    div.setAttribute('id', 'alert');
    div.classList.add('alert', 'alert-danger', 'position-absolute', 'top-50', 'w-50', 'p-5', 'fs-1');
    let title = document.createElement('h4');
    title.classList.add('alert-heading', 'text-center', 'fs-1');
    title.textContent = '¡Error!';
    div.appendChild(title);
    let line = document.createElement('hr');
    div.appendChild(line);
    let text = document.createElement('p');
    text.classList.add('text-center');
    text.textContent = mensaje;
    div.appendChild(text);
    htmlConstants.container.appendChild(div);

    setTimeout(()=>{
        div.remove();
    }, 3000);
   
}

export function showSuccess(mensaje){
    let div = document.createElement('div');
    div.setAttribute('role', 'alert');
    div.setAttribute('id', 'alert');
    div.classList.add('alert', 'alert-success', 'position-absolute', 'top-50', 'w-50', 'p-5', 'fs-1');
    let title = document.createElement('h4');
    title.classList.add('alert-heading', 'text-center', 'fs-1');
    title.textContent = '¡Éxito!';
    div.appendChild(title);
    let line = document.createElement('hr');
    div.appendChild(line);
    let text = document.createElement('p');
    text.classList.add('text-center');
    text.textContent = mensaje;
    div.appendChild(text);
    htmlConstants.container.appendChild(div);

    setTimeout(()=>{
        div.remove();
    }, 3000);

}

export function createPaginator(actualPage = 1, totalPages = 2){

    let firstPage = actualPage - 2;;

    if(firstPage < 1){
        firstPage = 1;
    }



    let pagination = document.createElement('nav');
        let list = document.createElement('ul');
        list.classList.add('pagination', 'justify-content-center');


        let listPrevious = document.createElement('li');
        listPrevious.classList.add('page-item');
            let previousLink = document.createElement('a');
            previousLink.classList.add('page-link');
            previousLink.dataset.page = 'previous';
            if (actualPage == 1){
                previousLink.classList.add('disabled');
            }

            let previousIcon = document.createElement('i');
            previousIcon.classList.add('bi', 'bi-arrow-left-short');
            previousLink.appendChild(previousIcon);
            previousLink.href = '#';
            previousLink.addEventListener('click', pageChanger);
            listPrevious.appendChild(previousLink);
            list.appendChild(listPrevious);
            
        for(let i = firstPage; i < firstPage + 5 && i <= totalPages; i++){
            let listItem = document.createElement('li');
            listItem.classList.add('page-item');
            let link = document.createElement('a');
            link.dataset.page = i;
            link.classList.add('page-link');
            if(i == document.querySelector('#coleccion').dataset.actualPage){
                link.classList.add('active');
            }
            link.textContent = i;
            link.href = '#';
            link.addEventListener('click', pageChanger);
            listItem.appendChild(link);
            list.appendChild(listItem);
        }

        let listNext = document.createElement('li');
        listNext.classList.add('page-item');
            let nextLink = document.createElement('a');
            nextLink.classList.add('page-link');
            nextLink.dataset.page = 'next';
            let nextIcon = document.createElement('i');
            nextIcon.classList.add('bi', 'bi-arrow-right-short');
            nextLink.appendChild(nextIcon);
            nextLink.href = '#';
            nextLink.addEventListener('click', pageChanger);
            if(actualPage == totalPages){
                nextLink.classList.add('disabled');
            }   
            listNext.appendChild(nextLink);
            list.appendChild(listNext);


        pagination.appendChild(list);
        htmlConstants.container.appendChild(pagination);

}

export function pageChanger(event){
    event.preventDefault();
    let actual = document.querySelector('#coleccion').dataset.actualPage;
    let type = document.querySelector('#coleccion').dataset.type;
    let page = this.dataset.page;
    if(page === 'previous'){
        page = parseInt(actual) - 1;
    }else if(page === 'next'){
        page = parseInt(actual) + 1;
    }

    switch(type){
        case 'sets':
            createSetPage(page);
            break;
        case 'pieces':
           createPiecePage(page);
            break;
        case 'lost':
            createLostPiecePage(page); //TODO no implementado
            break;
        case 'mySets':
            createMySetsPage();
            break;
        default:
            showError('Error al cambiar de página');
    }
}

export async function datalistCharger(data){
    htmlConstants.datalistOptions.innerHTML = '';
    data.results.forEach(element => {
        let option = document.createElement('option');
        option.value = element.name;
        option.dataset.id = element.id;
        htmlConstants.datalistOptions.appendChild(option);
    });
}

export async function createMenu(){
    resetMenu();
    htmlConstants.internalMenu.classList.remove('d-none');
    let themes = await endPoints.getAllThemes();
    datalistCharger(themes);
    htmlConstants.buttonFilter.addEventListener('click', ()=>{
        let type = document.querySelector('#coleccion').dataset.type;
        switch(type){
            case 'sets':
                createSetPage();
                break;
            case 'mySets':
                createMySetsPage();
                break;
            default:
                showError('Error al cambiar de página');
        }
    });

    htmlConstants.buttonReset.addEventListener('click', resetMenu);
}

export function resetMenu(){
    htmlConstants.datalist.value = '';
    htmlConstants.since.value = '';
    htmlConstants.until.value = '';
    htmlConstants.minParts.value = '';
    htmlConstants.maxParts.value = '';
    htmlConstants.orderBy.value = '';
}

export function filtersData(){
    
    let options = document.querySelectorAll('#datalistOptions option');
    let theme_id = getRealValueFromDatalist(htmlConstants.datalist, options);
    let min_year = htmlConstants.since.value;
    let max_year = htmlConstants.until.value;
    let min_parts = htmlConstants.minParts.value;
    let max_parts = htmlConstants.maxParts.value;
    let ordering = htmlConstants.orderBy.value
    
    let filters = `${theme_id? `&theme_id=${theme_id}`: ''}${min_year? `&min_year=${min_year}`: ''}${max_year? `&max_year=${max_year}`: ''}${min_parts? `&min_parts=${min_parts}`: ''}${max_parts? `&max_parts=${max_parts}`: ''}${ordering? `&ordering=${ordering}`: ''}`;

    return filters;
}

function getRealValueFromDatalist(datalist, options){

    let option;
    options.forEach(element => {
        if(element.value === datalist.value){
            option = element;
        }
    });
    if(!option){
        return null;
    }else{
        return option.dataset.id;
    }
}