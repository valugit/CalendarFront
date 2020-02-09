import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from "@fullcalendar/interaction";
import EventInfoPopup from './popups/EventInfo';
import { useSelector } from 'react-redux';
import { api } from '../../helpers/api';

const createEvents = events => {
  let myEvents = []
  let i = 0

  while (i < events.length) {
    myEvents.push({
      id: events[i].id,
      title: events[i].title,
      start: events[i].start,
      end: events[i].end,
      extendedProps: {
        description: events[i].description,
        players: events[i].players.length
      }
    })
    i++
  }

  return myEvents
}

const getEvents = setEvents => {
  api.get('/user/reservations', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    }
  }).then(json => {
    console.log(json)
    setEvents(createEvents(json.data.seance_joined))
  }).catch(err => {
    console.log(err)
  })
}

const PlayerCalendar = () => {
  const [events, setEvents] = useState([])
  const [popup, setPopup] = useState({ active: false, info: null })
  const user = useSelector(state => state.user)

  useEffect(() => {
    getEvents(setEvents)
  }, []);

  return <>
    <h2>Your reservations:</h2>
    <FullCalendar
      defaultView="dayGridMonth"
      events={ events }
      header={ {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
      } }
      eventLimit={ true }
      plugins={ [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin] }
      eventClick={ info => setPopup({ active: true, info: info }) }
      dateClick={ arg => arg.view.calendar.changeView('timeGridDay', arg.date) }
    />
    { popup.active
      ? <EventInfoPopup info={ popup.info } setPopup={ setPopup } />
      : null }
  </>
};

export default PlayerCalendar;