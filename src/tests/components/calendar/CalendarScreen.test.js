import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { act } from '@testing-library/react';

import { types } from '../../../types/types';
import { messages } from '../../../helpers/calendar-messages-es';
import { CalendarScreen } from '../../../components/calendar/CalendarScreen';
import { eventSetActive, eventStartLoadingAll } from '../../../actions/calendarEvents';




jest.mock('../../../actions/calendarEvents', () => ({
    eventSetActive: jest.fn(),
    eventStartLoadingAll: jest.fn()
}));

Storage.prototype.setItem = jest.fn();

const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

const initState = {
    auth: {
        uid: '123',
        name: 'Nico'
    },
    calendar: {
        activeEvent: '12345678',
        events: [],
        selectedDate: {
            start: '0',
            end: '1'
        }
    },
    ui: {
        modalOpen: false
    }
};
let store = mockStore( initState );
store.dispatch = jest.fn();



const wrapper = mount(
    <Provider store={ store }>
        <MemoryRouter >
            <CalendarScreen />
        </MemoryRouter>
    </Provider>
);



describe('Pruebas en <CalendarScreen />', () => {

    test('Debe de mostrarse correctamente', () => {
        expect( wrapper ).toMatchSnapshot();
    });

    test('Pruebas con las interacciones del calendario', () => {
        const calendar = wrapper.find('Calendar');

        const calendarMessages = calendar.prop('messages');
        expect(calendarMessages).toEqual( messages );

        calendar.prop('onDoubleClickEvent')();
        expect( store.dispatch ).toHaveBeenCalledWith( { type: types.uiOpenModal } );

        calendar.prop('onSelectEvent')({ start: 'Hola' });
        expect( eventSetActive ).toHaveBeenCalledWith({ start: 'Hola' });

        act(() => { //el ACT hace modificaciones en setState
            calendar.prop('onView')('week');
            expect( localStorage.setItem ).toHaveBeenCalledWith('lastView', 'week');    
        });
       
    });


});