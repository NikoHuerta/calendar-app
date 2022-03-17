import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Swal from 'sweetalert2';

import '@testing-library/jest-dom';

import { startChecking, startLogin, startRegister } from '../../actions/auth';
import { types } from '../../types/types';
import * as fetchMocked from '../../helpers/fetch';
import { type } from '@testing-library/user-event/dist/type';



jest.mock('sweetalert2', ()=> ({
    fire: jest.fn()
}));

const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

const initState = {};
let store = mockStore( initState );


Storage.prototype.setItem = jest.fn();
let token = '';



describe('Pruebas en las acciones de auth.js', () => {

    beforeEach(() => {
        store = mockStore( initState );
        jest.clearAllMocks();
    });

    test('startLogin correcto', async () => { 
        await store.dispatch(startLogin('nhuertaf@icloud.com', '35571e9cc'));
        const actions = store.getActions();
        
        expect(actions[0]).toEqual({
            type: types.authLogin,
            payload: {
                uid: expect.any(String),
                name: expect.any(String),
                rol: expect.any(String)
            }
        });
        expect(localStorage.setItem).toHaveBeenCalledWith('token', expect.any(String));
        expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date', expect.any(Number));

        // token
        // console.log(localStorage.setItem.mock.calls[0][1]);
        // token = localStorage.setItem.mock.calls[0][1];
    });

    test('startLogin INcorrecto', async () => { 
        await store.dispatch(startLogin('nhuertaf@icloud.com', '123456'));
        let actions = store.getActions();

        expect(actions).toEqual([]);
        expect(Swal.fire).toHaveBeenCalledWith('Error', 'Error al logear usuario -- password invalida', 'error');

        await store.dispatch(startLogin('nhuertaffffffffff@icloud.com', '35571e9cc'));
        actions = store.getActions();
        expect(actions).toEqual([]);
        expect(Swal.fire).toHaveBeenCalledWith('Error', 'Error al logear usuario -- email no esta registrado','error');
    });

    test('startRegister correcto', async() => { 
        fetchMocked.fetchAxios = jest.fn(() => ({
            data : {
                ok: true,
                uid: 'asdsa2',
                name: 'Amparito User',
                rol: 'USER_ROLE',
                token: 'SADAS2DSAD',
            }
        }));

        await store.dispatch(startRegister('nhuertaf2@icloud2.com', '123456', 'Amparito User'));
        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.authLogin,
            payload: {
                uid: "asdsa2",
                name: "Amparito User",
                rol: "USER_ROLE",
            }
        });
        expect(localStorage.setItem).toHaveBeenCalledWith('token', 'SADAS2DSAD');
        expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date', expect.any(Number));
    });

    test('startChecking correcto', async () => { 
        
        
        fetchMocked.fetchAxios = jest.fn(() => ({
            data : {
                ok: true,
                uid: 'asdsa2',
                name: 'Amparito User',
                rol: 'USER_ROLE',
                token: 'SADAS2DSAD',
            }
        }));


        await store.dispatch( startChecking() );
        const actions = store.getActions();
        
        console.log(actions);


    });


    


});