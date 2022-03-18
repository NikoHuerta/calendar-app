import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';

import { DeleteEventFab } from '../../../components/ui/DeleteEventFab';
import { eventStartDelete } from '../../../actions/calendarEvents';

const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

const initState = {
    calendar: {
        activeEvent: '12345678'
    }
};
let store = mockStore( initState );
store.dispatch = jest.fn(); //solo importa que se dispare, por eso el mock

jest.mock('../../../actions/calendarEvents', () => ({
    eventStartDelete: jest.fn()
}));


const wrapper = mount(
    <Provider store={ store }>
        <DeleteEventFab />
    </Provider>
);

describe('Pruebas en componente <DeleteEventFab />', () => {

    beforeEach(()=>{
        store = mockStore(initState);
        jest.clearAllMocks();
    });

    test('Debe de mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('Debe de llamar a la accion correctamente', () => {
        wrapper.find('button').prop('onClick')();
        expect(eventStartDelete).toHaveBeenCalledWith('12345678');
    });
});