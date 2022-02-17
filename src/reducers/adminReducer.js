import { types } from '../types/types';

const initialState = {
    page: null
};


export const adminReducer = ( state = initialState, action ) => {

    switch( action.type ){

        case types.adminNavigation:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
    // adminNavigation: '[admin-event] Change Navigation'
}