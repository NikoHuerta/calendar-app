import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import Swal from 'sweetalert2';




import { LoginScreen } from '../../../components/auth/LoginScreen';
import { startLogin, startRegister } from '../../../actions/auth';

jest.mock('../../../actions/auth', () => ({
    startLogin: jest.fn(),
    startRegister: jest.fn()
}));

jest.mock('sweetalert2', ()=> ({
    fire: jest.fn()
}));


const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

const initState = {
    calendar: {
        activeEvent: '12345678'
    }
};
let store = mockStore( initState );
store.dispatch = jest.fn(); //solo importa que se dispare, por eso el mock


const wrapper = mount(
    <Provider store={ store }>
        <LoginScreen />
    </Provider>
);

describe('Pruebas en <LoginScreen />', () => { 

    beforeEach( () => {
        jest.clearAllMocks();
    });

    test('Debe de mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('Debe de llamar el dispatch del login', () => {
        
        wrapper.find('input[name="lEmail"]').simulate('change', {
            target: {
                name: 'lEmail',
                value: 'nico@nico.nico'
            }
        });
        wrapper.find('input[name="lPassword"]').simulate('change', {
            target: {
                name: 'lPassword',
                value: '123456'
            }
        });

        wrapper.find('form').at(0).prop('onSubmit')({
            preventDefault(){}
        });

        expect(startLogin).toHaveBeenCalledWith('nico@nico.nico','123456');
    });

    test('Debe de llamar el dispatch del register', () => {
        
        wrapper.find('input[name="rName"]').simulate('change', {
            target: {
                name: 'rName',
                value: 'nicolas huerta'
            }
        });
        wrapper.find('input[name="rEmail"]').simulate('change', {
            target: {
                name: 'rEmail',
                value: 'nico@nico.cl'
            }
        });
        wrapper.find('input[name="rPassword1"]').simulate('change', {
            target: {
                name: 'rPassword1',
                value: '123456'
            }
        });
        wrapper.find('input[name="rPassword2"]').simulate('change', {
            target: {
                name: 'rPassword2',
                value: '123456'
            }
        });

        wrapper.find('form').at(1).prop('onSubmit')({
            preventDefault(){}
        });
        expect(Swal.fire).not.toHaveBeenCalled();
        expect(startRegister).toHaveBeenCalledWith('nico@nico.cl','123456', 'nicolas huerta');
    });

    test('No hay registro si las contraseñas son diferentes', () => {
        wrapper.find('input[name="rName"]').simulate('change', {
            target: {
                name: 'rName',
                value: 'nicolas huerta'
            }
        });
        wrapper.find('input[name="rEmail"]').simulate('change', {
            target: {
                name: 'rEmail',
                value: 'nico@nico.cl'
            }
        });
        wrapper.find('input[name="rPassword1"]').simulate('change', {
            target: {
                name: 'rPassword1',
                value: '123456789'
            }
        });
        wrapper.find('input[name="rPassword2"]').simulate('change', {
            target: {
                name: 'rPassword2',
                value: '1234567'
            }
        });

        wrapper.find('form').at(1).prop('onSubmit')({
            preventDefault(){}
        });

        // expect(startRegister).toHaveBeenCalledTimes(0);
        expect(startRegister).not.toHaveBeenCalled();
        expect(Swal.fire).toHaveBeenCalledWith('Error', 'Las contraseñas tienen que ser iguales', 'error');
    });

});