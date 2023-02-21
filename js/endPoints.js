import { filtersData } from "./utils.js";
const key = 'd9a4c4eb34a74edecf0e9de8c380ee94';

// Función para obtener los sets
export const getSets = async (pagina, cantidad) => {
    const res = await fetch(`https://rebrickable.com/api/v3/lego/sets/?page=${pagina}&page_size=${cantidad}${filtersData()}&key=${key}`);
    if(!res.ok){
        return false;
    }else{
        const set = await res.json();
        return set;
    }
}

// Funcion para obtener las piezas
export const getPieces = async (pagina, cantidad) => {
    const res = await fetch(`https://rebrickable.com/api/v3/lego/parts/?page=${pagina}&page_size=${cantidad}${filtersData()}&key=${key}`);
    if(!res.ok){
        return false;
    }else{
        const piece = await res.json();
        return piece;
    }
}

// Funcion para obtener una pieza
export const getPiece = async (id) => {
    const res = await fetch(`https://rebrickable.com/api/v3/lego/parts/${id}/?key=${key}`);
    const piece = await res.json();
    return piece;
}

// Funcion para obtener un set
export const getSet = async (id) => {
    const res = await fetch(`https://rebrickable.com/api/v3/lego/sets/${id}/?key=${key}`);
    const set = await res.json();
    return set;
}

// Funcion para obtener las partes de un set
export const getSetParts = async (id) => {
    const res = await fetch(`https://rebrickable.com/api/v3/lego/sets/${id}/parts/?key=${key}`);
    const part = await res.json();
    return part;
}

// Funcion para obtener los temas
export const getThemes = async (pagina, cantidad) => {
    const res = await fetch(`https://rebrickable.com/api/v3/lego/themes/?page=${pagina}&page_size=${cantidad}&key=${key}`);
    const theme = await res.json();
    return theme;
}

// Funcion para obtener todos los temas
export const getAllThemes = async () => {
    const res = await fetch(`https://rebrickable.com/api/v3/lego/themes/?key=${key}`);
    const theme = await res.json();
    return theme;
}

// Funcion para obtener todas las categorias
export const getAllCategories = async () => {
    const res = await fetch(`https://rebrickable.com/api/v3/lego/part_categories/?key=${key}`);
    const categories = await res.json();
    return categories;
}


// Funcion para obtener un tema
export const getTheme = async (id) => {
    const res = await fetch(`https://rebrickable.com/api/v3/lego/themes/${id}/?key=${key}`);
    const theme = await res.json();
    return theme;
}

// Funcion para obtener el token
export const getToken = async () => {

    let opciones={
        method: 'POST', 
        headers: {
            'Content-type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
            'Authorization': 'key d9a4c4eb34a74edecf0e9de8c380ee94',
        },
        body: 'username=jcabezasp&password=15512882'
    };

    const res = await fetch(`https://rebrickable.com/api/v3/users/_token/`, opciones);
    if(!res.ok) throw new Error(res.status);

    const token = await res.json();
    return token.user_token;
}

// Funcion para obtener todas las piezas de un usuario
export const getAllUserParts = async (pagina, cantidad) => {
        const token = await getToken();
        const res = await fetch(`https://rebrickable.com/api/v3/users/${token}/allparts/?page=${pagina}&page_size=${cantidad}&key=${key}`);
        const parts = await res.json();
        return parts;
    }

// Funcion para obtener todas las piezas perdidas por un usuario
export const getAllUserLostParts = async (pagina, cantidad) => {
        const token = await getToken();
        const res = await fetch(`https://rebrickable.com/api/v3/users/${token}/lost_parts/?page=${pagina}&page_size=${cantidad}&key=${key}`);
        const parts = await res.json();
        return parts;   
    }

// Funcion para añadir una pieza perdida a un usuario
export const setLostPart = async (id) => {
        const token = await getToken();
        let opciones={
            method: 'POST', 
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
                'Authorization': 'key d9a4c4eb34a74edecf0e9de8c380ee94',
            },
            body: `inv_part_id=${id}`
        };

        const res = await fetch(`https://rebrickable.com/api/v3/users/${token}/lost_parts/`, opciones);
        if(!res.ok) throw new Error(res.status);;
        return res;
    }

// Funcion para eliminar una pieza perdida de un usuario
export const deleteLostPart = async (id) => {
        const token = await getToken();
        let opciones={
            method: 'DELETE', 
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
                'Authorization': 'key d9a4c4eb34a74edecf0e9de8c380ee94',
            },
        };
        const res = await fetch(`https://rebrickable.com/api/v3/users/${token}/lost_parts/${id}/`, opciones);
        return res.status;
    }

// Funcion para obtener todos los sets de un usuario
export const getAllUserSets = async (pagina, cantidad) => {
        const token = await getToken();
        const res = await fetch(`https://rebrickable.com/api/v3/users/${token}/sets/?page=${pagina}&page_size=${cantidad}${filtersData()}&key=${key}`);
        const sets = await res.json();
        return sets;
    }

// Funcion para añadir un set a un usuario
export const setUserSet = async (id) => {
        const token = await getToken();
        let opciones={
            method: 'POST',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
                'Authorization': 'key d9a4c4eb34a74edecf0e9de8c380ee94',
            },
            body: `set_num=${id}`
        };
        const res = await fetch(`https://rebrickable.com/api/v3/users/${token}/sets/`, opciones);
        return res.status;
    }

// Funcion para eliminar un set de un usuario
export const deleteUserSet = async (id) => {
        const token = await getToken();
        let opciones={
            method: 'DELETE', 
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
                'Authorization': 'key d9a4c4eb34a74edecf0e9de8c380ee94',
            },
        };
        const res = await fetch(`https://rebrickable.com/api/v3/users/${token}/sets/${id}/?set_num=${id}`, opciones);
        return res.status;
    }

// Funcion para obtener perfil de usuario
export const getUserProfile = async () => {
        const token = await getToken();
        const res = await fetch(`https://rebrickable.com/api/v3/users/${token}/profile/?key=${key}`);
        const user = await res.json();
        return user;
    }


