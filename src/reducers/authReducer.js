import { types } from '../types/types';

const initialState = {
    checking: true,
    // uid: null,
    // name: null
};


export const authReducer = ( state = initialState, action ) => {

    switch( action.type ){

        case types.authLogin:
            return {
                ...state,
                checking: false,
                ...action.payload
            }


        default:
            return state;
    }

}



// authChecking: '[auth-event] Checking login state',
// authCheckingFinish: '[auth-event] Finish checking login state',
// authStartLogin: '[auth-event] Start Loging',
// authLogin: '[auth-event] Login',
// authStartRegister: '[auth-event] Start Register',
// authStartTokenRenew: '[auth-event] Start token renew',
// authLogout: '[auth-event] Logout'