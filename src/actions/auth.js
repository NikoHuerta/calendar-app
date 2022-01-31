import Swal from "sweetalert2";

import { fetchSinToken } from "../helpers/fetch"
import { types } from "../types/types";


export const startLogin = (email, password) => {
    return async ( dispatch ) => {

        const resp = await fetchSinToken('auth', { email, password }, 'POST');
        const body = await resp.json();

        if(body.ok){
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime() );

            dispatch( login({ 
                    uid: body.uid,
                    name: body.name
                }) );
        } else {

            const errorMsg = body.errors ? Object.values( body.errors )[0].msg : body.msg;
            Swal.fire('Error', errorMsg, 'error');

            // let sumError = '';
            // const errorMsg2 = body.errors ? Object.values(body.errors).forEach( element =>  sumError+=element) : body.msg;
            // console.log(sumError);
        }
    }
}

export const startRegister = (email, password, name) => {
    return async (dispatch) => {

        const resp = await fetchSinToken('usuarios', { name, email, password, rol: 'USER_ROLE' }, 'POST');
        const body = await resp.json();

        if(body.ok){
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime() );

            dispatch( login({ 
                uid: body.uid,
                name: body.name
            }) );
        } else {
            console.log(body);
        }
    }
}

const login = ( user ) => ({
    type: types.authLogin,
    payload: user
})