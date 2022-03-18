import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { AppRouter } from '../../router/AppRouter';


const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );



// store.dispatch = jest.fn(); //solo importa que se dispare, por eso el mock



describe('Pruebas en <AppRouter />', () => {

    test('Debe de mostrar el espere', () => {

        const initState = {
            auth: {
                checking: true
            }
        };
        const store = mockStore( initState );
        const wrapper = mount(
            <Provider store={ store }>
                <AppRouter />
            </Provider>
        );
        // expect(wrapper).toMatchSnapshot();
        expect((wrapper).find('h5').exists()).toBe(true);
    });

    test('Debe de mostrar la ruta publica', () => {

        const initState = {
            auth: {
                checking: false
            }
        };
        const store = mockStore( initState );
        const wrapper = mount(
            <Provider store={ store }>
                <AppRouter />
            </Provider>
        );
        // expect(wrapper).toMatchSnapshot();
        expect((wrapper).find('.login-container').exists()).toBe(true);
    });
    
    
    test('Debe de mostrar la ruta privada', () => {

        const initState = {
            auth: {
                checking: false,
                uid: '123',
                name: 'Nicolas',
                rol: 'USER_ROLE'
            },
            calendar: {
                events: [],
                selectedDate: {
                    start: '0',
                    end: '0'
                }
            },
            ui: {
                modalOpen: false
            }
        };
        const store = mockStore( initState );
        const wrapper = mount(
            <Provider store={ store }>
                <AppRouter />
            </Provider>
        );
        // expect(wrapper).toMatchSnapshot();
        expect((wrapper).find('.calendar-screen').exists()).toBe(true);
    });
    

});