import moment from 'moment';
import { types } from '../types/types';

const initialState = {
    events: [{
        id: new Date().getTime(),
        title: 'Cumpleaños de Nicolas',
        start: moment().subtract(2, 'days').toDate(),
        end: moment().add(2, 'hours').subtract(2, 'days').toDate(),
        bgcolor: '#fafafa',
        notes: 'Comprar el pastel',
        user: {
            _id: '123',
            name: 'Nicolas'
        }
    }],
    activeEvent: null,
};


export const calendarReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.eventSetActive:
            return {
                ...state,
                activeEvent: action.payload        
            };
        
        case types.eventRemoveActive:
            return {
                ...state,
                activeEvent: null,
            }

        case  types.eventAddNew:
            return { 
                ...state,
                events: [ 
                    ...state.events,
                    action.payload,
                ],
                activeEvent: null,
            }
        
        case types.eventUpdated:
            return {
                ...state,
                events: state.events.map( event => (event.id === action.payload.id) ? action.payload : event )
            }
        
        case types.eventDeleted:
            return {
                ...state,
                events: state.events.filter( event => (event.id !== state.activeEvent.id) ),
                activeEvent: null,
            }

        default:
            return state;
    }
}