import React, { useEffect, useState } from 'react';
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
import { eventRemoveActive, eventRemoveSelectedDate, eventSelectedDate, eventSetActive, eventStartLoadingAll, eventStartLoadingUser } from '../../actions/calendarEvents';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';
import Swal from 'sweetalert2';



moment.locale('es');

const localizer = momentLocalizer(moment); // or globalizeLocalizer

export const CalendarScreen = () => {

    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');
    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector(state => state.calendar);
    const { uid } = useSelector(state => state.auth);

    useEffect(() => {
    //   dispatch( eventStartLoadingUser() ); //PARA CARGAR SOLO LOS DEL USUARIO LOGEADO
        dispatch( eventStartLoadingAll() ); //PARA CARGAR TODOS LOS EVENTOS

    }, [dispatch]);
    


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
        // console.log(e);
        dispatch(eventRemoveActive());
        dispatch(eventRemoveSelectedDate());
        if ((e.action === 'doubleClick') || (e.action === 'select')) {

            const momentStart = moment(e.start);
            const momentEnd = moment(e.end);
    
            if(momentStart.isSameOrAfter(momentEnd)){
                console.log('Fecha fin debe ser mayor');
                return Swal.fire({
                    title: 'Error',
                    text: 'La fecha de fin debe de ser mayor a la fecha de inicio',
                    icon: 'error'
                });
            }
    
            if(momentStart.isBefore( moment() )){
                console.log('Fecha inicio no debe ser menor a la fecha actual');
                return Swal.fire({
                    title: 'Error',
                    text: 'La fecha de inicio debe de ser mayor a la fecha actual',
                    icon: 'error'
                });
            }
            
            dispatch(eventSelectedDate({
                start: e.start,
                end: e.end
            }) );
 
            dispatch(uiOpenModal());
        }

    }

    const eventStyleGetter = (event, start, end, isSelected) => {
        const style = {
            backgroundColor: (uid === event.usuario._id) ? '#367CF7' : '#465660',
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
