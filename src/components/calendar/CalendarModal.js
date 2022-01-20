import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import DateTimePicker from 'react-datetime-picker';
import Modal from 'react-modal';
import Swal from "sweetalert2";

import { uiCloseModal } from '../../actions/ui';
import { eventAddNew, eventRemoveActive, eventUpdated } from '../../actions/calendarEvents';



const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');

const now = moment().minutes(0).seconds(0).add(1, 'hours');
const endNow = now.clone().add(1, 'hours');

const initFormValue = {
    title: '',
    notes: '',
    start: now.toDate(),
    end: endNow.toDate()
};

export const CalendarModal = () => {

    const { modalOpen } = useSelector(state => state.ui);
    const { activeEvent } = useSelector(state => state.calendar);
    const [titleValid, setTitleValid] = useState(true);
      
    const [formValues, setFormValues] = useState(initFormValue);
    const { start, end, notes, title } = formValues;

    const resetForm = () => {
        setFormValues(initFormValue);
    }

    useEffect(() => {
        if(activeEvent){
            setFormValues(activeEvent);
        }else{
            setFormValues(initFormValue);
        }
    }, [activeEvent, setFormValues]);


    const handleInputChange = (e) => {
        if(typeof (e.target) != "undefined"){
            setFormValues({
                ...formValues,
                [e.target.name]: e.target.value
            });
        }else{
            setFormValues({
                ...formValues,
                start: e.start,
                end: e.end
            })
        }
    };

    const dispatch = useDispatch();

    const closeModal = () => {
        dispatch(uiCloseModal());
        dispatch(eventRemoveActive());
        resetForm();
    };

    const handleStartDateChange = (e) => {
        handleInputChange({
            ...formValues,
            start: e
        });
    };

    const handleEndDateChange = (e) => {
        handleInputChange({
            ...formValues,
            end: e
        });
    };

    const handleSubmitForm = (e) => {
        e.preventDefault();
        // console.log(formValues);

        const momentStart = moment(start);
        const momentEnd = moment(end);

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

        if(title.trim().length < 2){
            return setTitleValid(false);
        }
        

        //TODO: realizar save en BD

        if(activeEvent){
            dispatch( eventUpdated(formValues) );
        }else{
            dispatch( eventAddNew({
                ...formValues,
                id: new Date().getTime(),
                user: {
                    _id: 1234567890,
                    name: 'default name'
                }
            }) );
        }
        
        setTitleValid(true);
        closeModal();
    }

    return (
        <Modal
            isOpen={ modalOpen }
            onRequestClose={ closeModal }
            style={ customStyles }
            className="modal"
            overlayClassName="modal-fondo"
            closeTimeoutMS={200}
        >
            <h1> { (activeEvent)? 'Editar Evento' : 'Nuevo evento' } </h1>
            <hr />
            <form 
                className="container"
                onSubmit={ handleSubmitForm }
            >

                <div className="form-group">
                    <label>Fecha y hora inicio</label>
                    <DateTimePicker
                        onChange={ handleStartDateChange }
                        value={ start }
                        className="form-control"
                        name='start'
                    />
                </div>

                <div className="form-group">
                    <label>Fecha y hora fin</label>
                    <DateTimePicker
                        onChange={ handleEndDateChange }
                        value={ end }
                        minDate={ start }
                        className="form-control"
                        name='end'
                    />
                </div>

                <hr />
                <div className="form-group">
                    <label>Titulo y notas</label>
                    <input 
                        type="text" 
                        className={ `form-control ${ !titleValid && 'is-invalid' }` }
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={ title }
                        onChange={ handleInputChange }
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group">
                    <textarea 
                        type="text" 
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={ notes }
                        onChange={ handleInputChange }

                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </Modal>
    )
}
