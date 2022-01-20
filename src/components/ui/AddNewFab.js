import React from 'react'
import { useDispatch } from 'react-redux';
import { eventRemoveActive } from '../../actions/calendarEvents';
import { uiOpenModal } from '../../actions/ui';
// FAB floating action button
export const AddNewFab = () => {

    const dispatch = useDispatch();

    const handleClickNew = () => {
        dispatch( eventRemoveActive() );
        dispatch( uiOpenModal() );
    };

    return (
        <button
            className='btn btn-primary fab'
            onClick={ handleClickNew }
        >
            <i className='fas fa-plus'></i>
        </button>
    )
}
