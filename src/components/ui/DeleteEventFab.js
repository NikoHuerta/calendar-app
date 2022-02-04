import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { eventStartDelete } from '../../actions/calendarEvents';

export const DeleteEventFab = () => {

    const dispatch = useDispatch();
    const { activeEvent } = useSelector( state => state.calendar );

    const handleDelete = () => {
        dispatch( eventStartDelete(activeEvent) );
    }

    return (
        <button
            className='btn btn-danger fab-danger'
            onClick={ handleDelete }
        >
            <i className='fas fa-trash'></i>
            <span> Borrar Evento </span>
        </button>
    )
}
