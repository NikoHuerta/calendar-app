import React from 'react'

export const CalendarEvent = ({ event }) => {

    const {title, usuario} = event;

    return (
        <div>
            <strong>{ title }</strong>
            <span> - { usuario.name }</span>
        </div>
    )
}
