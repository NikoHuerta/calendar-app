import { types } from "../types/types"

export const eventAddNew = (event) => ({
    type: types.eventAddNew,
    payload: event
})

export const eventSetActive = (event) => ({
    type: types.eventSetActive,
    payload: event
});

export const eventRemoveActive = () => ({ type: types.eventRemoveActive });

export const eventUpdated = (event) => ({
    type: types.eventUpdated,
    payload: event
}); 

export const eventDeleted = () => ({ type: types.eventDeleted });

export const eventSelectedDate = (dates) => ({ 
    type: types.eventSelectedDate,
    payload: dates
});

export const eventRemoveSelectedDate = () => ({ type: types.eventRemoveSelectedDate });