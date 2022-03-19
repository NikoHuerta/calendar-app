import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moment from 'moment';
import { MemoryRouter } from 'react-router-dom';
import Swal from 'sweetalert2';
import { act } from '@testing-library/react';
import '@testing-library/jest-dom';

import 'jest-canvas-mock';

import { types } from '../../../types/types';
import { CalendarModal } from '../../../components/calendar/CalendarModal';
import { eventRemoveActive, eventRemoveSelectedDate, eventStartAddNew, eventStartUpdate } from '../../../actions/calendarEvents';
// import { eventSetActive, eventStartLoadingAll } from '../../../actions/calendarEvents';

jest.mock('sweetalert2', () => ({
    fire: jest.fn(),
}));

jest.mock('../../../actions/calendarEvents', () => ({
    eventStartUpdate: jest.fn(),
    eventRemoveActive: jest.fn(),
    eventRemoveSelectedDate: jest.fn(),
    eventStartAddNew: jest.fn()
}));

const middlewares = [ thunk ];
const mockStore = configureStore(middlewares);

const now = moment().minutes(0).seconds(0).add(1, 'hours');
const endNow = now.clone().add(1, 'hours');



const initState = {
    auth: {
        uid: '123',
        name: 'Nico'
    },
    calendar: {
        activeEvent: {
            title: 'Hola Mundo',
            notes: 'Algunas notas',
            start: now.toDate(),
            end: endNow.toDate()
        },
        events: [{
            title : 'titulo',
            notes : 'notas',
            start : '2022-03-19T03:00:00.000Z',
            end : '2022-03-20T03:00:00.000Z',
            eventId: '62354072d00b5a75f40d650b',
            usuario: {
                _id:'61f1b04ed6baa2e9d8971e57',
                name:'Nicolas Huerta'
            }
        }],
        selectedDate: {
            start: null,
            end: null
        }
    },
    ui: {
        modalOpen: true
    }
};
let store = mockStore( initState );
store.dispatch = jest.fn();


const wrapper = mount(
    <Provider store={ store }>
        <MemoryRouter >
            <CalendarModal />
        </MemoryRouter>
    </Provider>
);


describe('Pruebas sobre <CalendarModal />', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });
   
    test('Debe de mostrar el modal', () => {
        expect( wrapper.find('Modal').prop('isOpen') ).toBe(true);
    });

    test('Debe de llamar la accion de actualizar y cerrar modal', () => {
        wrapper.find('form').simulate('submit', {
            preventDefault() { }
        });

        expect(eventStartUpdate).toHaveBeenCalledWith(initState.calendar.activeEvent);
        expect(eventRemoveActive).toHaveBeenCalled();
        expect(eventRemoveSelectedDate).toHaveBeenCalled();
    });

    test('Debe de mostrar error si falta el titulo', () => {
        //en la prueba anterior se limpio el formulario
        wrapper.find('form').simulate('submit', {
            preventDefault() { }
        });
        expect(wrapper.find('input[name="title"]').hasClass('is-invalid')).toBe(true);
    });

    test('Debe de crear un nuevo evento', () => {
        
        const initState = {
            auth: {
                uid: '123',
                name: 'Nico'
            },
            calendar: {
                activeEvent: null,
                events: [{
                    title : 'titulo',
                    notes : 'notas',
                    start : '2022-03-19T03:00:00.000Z',
                    end : '2022-03-20T03:00:00.000Z',
                    eventId: '62354072d00b5a75f40d650b',
                    usuario: {
                        _id:'61f1b04ed6baa2e9d8971e57',
                        name:'Nicolas Huerta'
                    }
                }],
                selectedDate: {
                    start: null,
                    end: null
                }
            },
            ui: {
                modalOpen: true
            }
        };
        let store = mockStore( initState );
        store.dispatch = jest.fn();


        const wrapper = mount(
            <Provider store={ store }>
                <MemoryRouter >
                    <CalendarModal />
                </MemoryRouter>
            </Provider>
        );

        wrapper.find('input[name="title"]').simulate('change', {
            target: {
                name: 'title',
                value: 'Hola Pruebas'
            }
        });

        wrapper.find('form').simulate('submit', {
            preventDefault(){}
        });

        expect(eventStartAddNew).toHaveBeenCalledWith({
            end: expect.anything(),
            start: expect.anything(),
            title: 'Hola Pruebas',
            notes: ''
        });

        expect(eventRemoveActive).toHaveBeenCalled();        
        expect(eventRemoveSelectedDate).toHaveBeenCalled();
    });

    test('Debe de validar las fechas', () => {
     
        wrapper.find('input[name="title"]').simulate('change', {
            target: {
                name: 'title',
                value: 'Hola Pruebas'
            }
        });

        const hoy = new Date();
        act(() => {
            wrapper.find('DateTimePicker').at(1).prop('onChange')(hoy);    
        });

        wrapper.find('form').simulate('submit', {
            preventDefault(){}
        });

        expect(Swal.fire).toHaveBeenCalledWith({
                title: 'Error',
                text: 'La fecha de fin debe de ser mayor a la fecha de inicio',
                icon: 'error'
        });
    });

});