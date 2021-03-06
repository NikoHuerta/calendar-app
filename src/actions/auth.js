import Swal from "sweetalert2";

import { fetchAxios } from "../helpers/fetch"
import { types } from "../types/types";
import { eventLogout } from "./calendarEvents";


export const startLogin = (email, password) => {
    return async ( dispatch ) => {

        // const resp = await fetchSinToken('auth', { email, password }, 'POST');
        // const body = await resp.json();
        const resp = await fetchAxios('auth', { email, password }, 'POST');
        const { data: body } = resp;

        if(body.ok){
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime() );

            dispatch( login({ 
                    uid: body.uid,
                    name: body.name,
                    rol: body.rol
                }) );
        } else {

            const errorMsg = body.errors ? Object.values( body.errors )[0].msg : body.msg;
            Swal.fire('Error', errorMsg, 'error');
        }
    }
}

export const startRegister = (email, password, name) => {
    return async (dispatch) => {

        // const resp = await fetchSinToken('usuarios', { name, email, password, rol: 'USER_ROLE' }, 'POST');
        // const body = await resp.json();
        const resp = await fetchAxios('usuarios', { name, email, password, rol: 'USER_ROLE' }, 'POST');
        const { data: body } = resp;

        if(body.ok){
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime() );
            
            dispatch( login({ 
                uid: body.uid,
                name: body.name,
                rol: body.rol
            }) );
            
        } else {
            
            const errorMsg = body.errors ? Object.values( body.errors )[0].msg : body.msg;
            Swal.fire('Error', errorMsg, 'error');
        }
    }
}

export const startGoogleLogin = (idToken) => {
    return async (dispatch) => {

        // const resp = await fetchSinToken('auth/google', { id_token: idToken }, 'POST');
        // const body = await resp.json();
        const resp = await fetchAxios('auth/google', { id_token: idToken }, 'POST');
        const { data: body } = resp;

        if(body.ok){
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime() );

            dispatch( login({ 
                uid: body.usuario.uid,
                name: body.usuario.name,
                rol: body.usuario.rol
            }) );

        } else {
            
            const errorMsg = body.errors ? Object.values( body.errors )[0].msg : body.msg;
            Swal.fire('Error', errorMsg, 'error');
        }
    }
}

export const startFacebookLogin = (idToken, name, email) => {
    return async (dispatch) => {
        // const resp = await fetchSinToken('auth/facebook', { id_token: idToken, name, email }, 'POST');
        // const body = await resp.json();

        const resp = await fetchAxios('auth/facebook', { id_token: idToken, name, email }, 'POST');
        const { data: body } = resp;


        if(body.ok){
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime() );

            dispatch( login({ 
                uid: body.usuario.uid,
                name: body.usuario.name,
                rol: body.usuario.rol
            }) );

        } else {
            
            const errorMsg = body.errors ? Object.values( body.errors )[0].msg : body.msg;
            Swal.fire('Error', errorMsg, 'error');
        }
    }
}

export const startChecking = () => {
    return async (dispatch) => {
        // console.log(localStorage.getItem('token'));

        if(localStorage.getItem('token') === null){
            dispatch( checkingFinish() );
        } else{

            const resp = await fetchAxios('auth/renew', undefined,'GET',undefined, localStorage.getItem('token'));
            const { data: body } = resp;

            if(body.ok){

                localStorage.setItem('token', body.token);
                localStorage.setItem('token-init-date', new Date().getTime() );

                dispatch( login({ 
                    uid: body.uid,
                    name: body.name,
                    rol: body.rol
                }) );

            } else {
                dispatch( checkingFinish() );
            }
        }

        

    }
}

const checkingFinish = () => ({ type: types.authCheckingFinish });

const login = ( user ) => ({
    type: types.authLogin,
    payload: user
});

const logout = () => ({ type: types.authLogout });

export const startLogout = () => {
    return( dispatch ) => {
        localStorage.clear();
        dispatch( eventLogout() );
        dispatch( logout() );
    }
}
