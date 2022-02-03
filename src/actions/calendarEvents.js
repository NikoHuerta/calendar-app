import { fetchAxios } from "../helpers/fetch";
import { prepareEvents } from "../helpers/prepareEvents";
import { types } from "../types/types"



export const eventStartAddNew = (event) => {
    return async ( dispatch, getState ) => {

        const { uid, name } = getState().auth;

        try{
            const resp = await fetchAxios('eventos', event, 'POST', undefined, localStorage.getItem('token'));
            const { data: body } = resp;

            if(body.ok){
                event.id = body.evento.eventId;
                event.usuario = {
                    _id : uid,
                    name : name
                }
                dispatch( eventAddNew(event) );
            }

        } catch (err){
            console.log(err);
        }
    }
}

const eventAddNew = (event) => ({
    type: types.eventAddNew,
    payload: event
});

export const eventSetActive = (event) => ({
    type: types.eventSetActive,
    payload: event
});

export const eventRemoveActive = () => ({ type: types.eventRemoveActive });

export const eventUpdated = (event) => ({
    type: types.eventUpdated,
    payload: event
}); 

export const eventDeleted = () => ({ type: types.eventDeleted });

export const eventSelectedDate = (dates) => ({ 
    type: types.eventSelectedDate,
    payload: dates
});

export const eventRemoveSelectedDate = () => ({ type: types.eventRemoveSelectedDate });

//Cargar los eventos asociados al usuario
export const eventStartLoadingUser = () => {
    return async ( dispatch ) => {
        try {

            const resp = await fetchAxios('eventos/usuario',undefined,'GET',undefined, localStorage.getItem('token'));
            const { data: body } = resp;
            
            const eventos = prepareEvents(body.eventos);
            dispatch( eventLoaded(eventos) );

        } catch (err){
            console.log(err);
        }

    }
}

//Cargar todos los eventos
export const eventStartLoadingAll = () => {
    return async ( dispatch ) => {
        try {

            const resp = await fetchAxios('eventos',undefined,'GET',undefined, localStorage.getItem('token'));
            const { data: body } = resp;

            const eventos = prepareEvents(body.eventos);
            dispatch( eventLoaded(eventos) );

        } catch (err){
            console.log(err);
        }

    }
}

const eventLoaded = ( events ) => ({ 
    type: types.eventLoaded,
    payload: events 
});