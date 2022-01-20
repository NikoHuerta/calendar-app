import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/es';
import { useDispatch, useSelector } from 'react-redux'
import { messages } from '../../helpers/calendar-messages-es';

import { Navbar } from '../ui/Navbar';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { uiOpenModal } from '../../actions/ui';
import { eventRemoveActive, eventSetActive } from '../../actions/calendarEvents';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';



moment.locale('es');

const localizer = momentLocalizer(moment); // or globalizeLocalizer

export const CalendarScreen = () => {

    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');
    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector(state => state.calendar);

    const onDoubleClick = (e) => {
        dispatch(uiOpenModal());
    };

    const onSelectEvent = (e) => {
        dispatch(eventSetActive(e));
    }

    const onViewChange = (e) => {
        setLastView(e);
        localStorage.setItem('lastView', e);
    }

    const onSelectSlot = (e) => {
        console.log(e);
        dispatch(eventRemoveActive());
    }

    const eventStyleGetter = (event, start, end, isSelected) => {
        // console.log(event, start, end, isSelected);
        const style = {
            backgroundColor: '#367CF7',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white'
        };
        return {
            style
        }

    };

    return (
        <div className='calendar-screen'>
            <Navbar />

            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                messages={messages}
                eventPropGetter={ eventStyleGetter }

                onDoubleClickEvent={ onDoubleClick }
                onSelectEvent={ onSelectEvent }
                onView={ onViewChange }
                selectable={ true }
                onSelectSlot={ onSelectSlot }
                
                view={ lastView }
                components={{
                    event: CalendarEvent
                }}
            />
            <AddNewFab />
            { ( activeEvent ) && <DeleteEventFab /> }
            <CalendarModal />
        </div>
    )
}
