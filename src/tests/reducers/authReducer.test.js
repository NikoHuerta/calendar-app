import * as authActions from '../../actions/auth';
import { authReducer } from '../../reducers/authReducer';
import { types } from '../../types/types';

const initialState = {
    checking: true,
    // uid: null,
    // name: null,
    // rol: null
};


describe('Pruebas en authReducer.js', () => {

    test('Debe de retornar el estado por defecto', () => {
        const action = {};
        const state = authReducer(initialState, action);
        expect(state).toEqual(initialState);
    });

    test('Debe autenticar el usuario: authLogin' , () => {
        const action = {
            type: types.authLogin,
            payload: {
                uid: "asdsa2",
                name: "Amparito User",
                rol: "USER_ROLE",
            }
        };
        const state = authReducer(initialState, action);
        expect(state).toEqual({
            checking: false,
            uid: "asdsa2",
            name: "Amparito User",
            rol: "USER_ROLE",
        });
    });

    test('Debe modificar checking a false: authCheckingFinish' , () => {

        const initialState = {
            checking: true,
            uid: 'asdsa2',
            name: "Amparito User",
            rol: "USER_ROLE",
        };
        const action = { type: types.authCheckingFinish };
        const state = authReducer(initialState, action);
        expect(state).toEqual({ ... initialState, checking: false });
    });

    test('Debe deslogear al usuario: authLogout', () => {

        const initialState = {
            checking: true,
            uid: 'asdsa2',
            name: "Amparito User",
            rol: "USER_ROLE",
        };
        const action = { type: types.authLogout };
        const state = authReducer(initialState, action);
        expect(state).toEqual({ checking: false });
    });




});
