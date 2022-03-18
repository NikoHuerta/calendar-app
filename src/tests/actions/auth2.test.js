import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';

import { startChecking, startLogin } from '../../actions/auth';
import { types } from '../../types/types';



const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

const initState = {};
let store = mockStore( initState );

describe('Pruebas 2 en las acciones de auth.js', () => {

    test('startChecking correcto', async () => { 

        await store.dispatch(startLogin('nhuertaf@icloud.com', '35571e9cc'));
        await store.dispatch( startChecking() );

        const actions = store.getActions();

        expect(actions[1]).toEqual({
            type: types.authLogin,
            payload: {
                uid: '61f1b04ed6baa2e9d8971e57',
                name: 'Nicolas Huerta',
                rol: 'ADMIN_ROLE'
            }
        });

    });

});