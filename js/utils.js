import * as htmlConstants from './htmlConstants.js';
import {createSetPage} from './sets.js';
import {createPiecePage} from './piezas.js';

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
    div.classList.add('alert', 'alert-danger');
    div.textContent = mensaje;
    htmlConstants.container.appendChild(div);

    setTimeout(()=>{
        div.remove();
    }, 3000);
   
}

export function showSuccess(mensaje){

    let div = document.createElement('div');
    div.setAttribute('role', 'alert');
    div.setAttribute('id', 'alert');
    div.classList.add('alert', 'alert-success');
    div.textContent = mensaje;
    htmlConstants.container.appendChild(div);

    setTimeout(()=>{
        div.remove();
    }, 3000);

}

export function createPaginator(actualPage = 1){

    let firstPage;

    if(actualPage === 1 || actualPage === 2){
        firstPage = 1
    }else{
        firstPage = actualPage - 2;
    }



    let pagination = document.createElement('nav');
        let list = document.createElement('ul');
        list.classList.add('pagination', 'justify-content-center');


        let listPrevious = document.createElement('li');
        listPrevious.classList.add('page-item');
            let previousLink = document.createElement('a');
            previousLink.classList.add('page-link');
            previousLink.dataset.page = 'previous';
            if (actualPage === 1){
                previousLink.classList.add('disabled');
            }
            let previousIcon = document.createElement('i');
            previousIcon.classList.add('bi', 'bi-arrow-left-short');
            previousLink.appendChild(previousIcon);
            previousLink.href = '#';
            previousLink.addEventListener('click', pageChanger);
            listPrevious.appendChild(previousLink);
            list.appendChild(listPrevious);
            //TODO tener en cuenta el numero de paginas que hay
        for(let i = firstPage; i < firstPage + 5; i++){
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
            personalFunctions.createLostPiecePage(page);
            break;
        default:
            showError('Error al cambiar de página');
    }
}