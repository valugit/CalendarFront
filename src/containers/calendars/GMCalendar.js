import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from "@fullcalendar/interaction";
import { ButtonPrimary } from './../../components/Button';
import NewPopup from './popups/New';
import EventPopup from './popups/Event';

const myEvents = [
  {
    id: 1,
    title: 'Custom D&D',
    description: 'A custom scenario that I have created for novice',
    game: 'Dungeons & Dragons',
    players: 5,
    start: new Date(2020, 1, 5, 14, 30).toISOString(),
    end: new Date(2020, 1, 5, 18).toISOString(),
    backgroundColor: '#52dccd'
  },
]

const GMCalendar = () => {
  const [popup, setPopup] = useState({ type: null, info: null })

  return <>
    <FullCalendar
      defaultView="dayGridMonth"
      events={ myEvents }
      header={ {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
      } }
      eventLimit={ true }
      plugins={ [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin] }
      eventClick={ info => {
        setPopup({ type: 'event', info: info })
      } }
      dateClick={ arg => arg.view.calendar.changeView('timeGridDay', arg.date) }
    />
    <ButtonPrimary onClick={ () => setPopup({ type: 'new', info: null }) }>
      Add event
    </ButtonPrimary>
    {
      popup.type === 'new'
        ? <NewPopup setPopup={ setPopup } />
        : popup.type === 'event'
          ? <EventPopup info={ popup.info } setPopup={ setPopup } />
          : null
    }
  </>
};

export default GMCalendar;