import React, { useState } from 'react';
import { useForm } from '../../hooks/useForm';

import moment from 'moment';
import DateTimePicker from 'react-datetime-picker';
import Modal from 'react-modal';
import Swal from "sweetalert2";



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

export const CalendarModal = () => {

    const [ dateStart, setDateStart ] = useState(now.toDate());
    const [ dateEnd, setDateEnd ] = useState(endNow.toDate());
    const [titleValid, setTitleValid] = useState(true);

    const initialForm = {
        title: '',
        notes: '',
        start: dateStart,
        end: dateEnd
    };

    const [formValues, handleInputChange, reset] = useForm(initialForm);

    const { title, notes, start, end } = formValues;
    

    const closeModal = () => {
        //TODO: close Modal
    };

    const handleStartDateChange = (e) => {
        setDateStart(e);

        handleInputChange({
            ...formValues,
            start: e
        });
    };

    const handleEndDateChange = (e) => {
        setDateEnd(e);

        handleInputChange({
            ...formValues,
            end: e
        });
    };

    const handleSubmitForm = (e) => {
        e.preventDefault();

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

        if(title.trim().length < 2){
            setTitleValid(false);
        }

        //TODO: realizar save en BD

        setTitleValid(true);
        closeModal();
    }

    return (
        <Modal
            isOpen={ true }
            onRequestClose={ closeModal }
            style={ customStyles }
            className="modal"
            overlayClassName="modal-fondo"
            closeTimeoutMS={200}
        >
            <h1> Nuevo evento </h1>
            <hr />
            <form 
                className="container"
                onSubmit={ handleSubmitForm }
            >

                <div className="form-group">
                    <label>Fecha y hora inicio</label>
                    <DateTimePicker
                        onChange={ handleStartDateChange }
                        value={ dateStart }
                        className="form-control"
                        name='start'
                    />
                </div>

                <div className="form-group">
                    <label>Fecha y hora fin</label>
                    <DateTimePicker
                        onChange={ handleEndDateChange }
                        value={ dateEnd }
                        minDate={ dateStart }
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
