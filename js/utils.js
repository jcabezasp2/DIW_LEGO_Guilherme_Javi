import * as htmlConstants from './htmlConstants.js';

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