import { types } from '../types/types';


// {
//     id: desdeBD,
//     title: 'Cumpleaños de Nicolas',
//     start: moment().subtract(2, 'days').toDate(),
//     end: moment().add(2, 'hours').subtract(2, 'days').toDate(),
//     notes: 'Comprar el pastel',
//     user: {
//         _id: '123',
//         name: 'Nicolas'
//     }
// }


const initialState = {
    events: [],
    activeEvent: null,
    selectedDate: {
        start: null,
        end: null
    },
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
                events: state.events.map( event => (event.eventId === action.payload.eventId) ? action.payload : event )
            }
        
        case types.eventDeleted:
            return {
                ...state,
                events: state.events.filter( event => (event.eventId !== state.activeEvent.eventId) ),
                activeEvent: null,
            }
        
        case types.eventSelectedDate:
            return {
                ...state,
                selectedDate: action.payload
            }
        
        case types.eventRemoveSelectedDate:
            return {
                ...state,
                selectedDate: {
                    start: null,
                    end: null
                }
            }

        case types.eventLoaded:
            return {
                ...state,
                events: [...action.payload]
            }
        
        case types.eventLogout:
            return {
                ...initialState
            }

        default:
            return state;
    }
}