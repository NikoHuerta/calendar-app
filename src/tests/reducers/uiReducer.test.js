import { uiCloseModal, uiOpenModal } from '../../actions/ui';
import { uiReducer } from '../../reducers/uiReducer';

const initialState={
    modalOpen: false,
}

describe('Pruebas en uiReducer', () => {

    test('Debe de retornar el estado por defecto', () => { 
        const state = uiReducer( initialState, {} );
        expect(state).toEqual(initialState);
    });

    test('Debe de abrir y cerrar el modal', () => { 
        const modalOpen = uiOpenModal();
        const stateOpen = uiReducer(initialState, modalOpen);
        expect(stateOpen).toEqual({ modalOpen: true });

        const modalClose = uiCloseModal();
        const stateClose = uiReducer(initialState, modalClose);
        expect(stateClose).toEqual({ modalOpen: false });
    });

});