import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from "@fullcalendar/interaction";
import { ButtonPrimary, ButtonText } from './../../components/Button';
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';

const myEvents = [
  {
    title: 'Custom D&D',
    description: 'A custom scenario that I have created for novice',
    game: 'Dungeons & Dragons',
    players: 5,
    start: new Date(2020, 1, 5, 14, 30).toISOString(),
    end: new Date(2020, 1, 5, 18).toISOString()
  },
]

const EventPopup = props => {
  return <div className={ 'popup' }>
    <div>
      <ButtonText
        onClick={ () => props.setPopup({ active: false, type: null, info: null }) }
        className={ 'close' }
      >
        <CancelPresentationIcon />
      </ButtonText>
      <h2>{ props.info.event.title }</h2>
      <div className={ 'info' }>
        <div>
          <span>Description:</span>
          <span>{ props.info.event.extendedProps.description }</span>
        </div>
        <div>
          <span>Game:</span>
          <span>{ props.info.event.extendedProps.game }</span>
        </div>
        <div>
          <span>Players:</span>
          <span>{ props.info.event.extendedProps.players }</span>
        </div>
      </div>
      <ButtonPrimary
        onClick={ () => null }
        className={ 'action delete' }
      >
        Delete
      </ButtonPrimary>
    </div>
  </div>
}

const NewPopup = props => {
  return <div className={ 'popup' }>
    <div>
      <ButtonText
        onClick={ () => props.setPopup({ active: false, type: null, info: null }) }
        className={ 'close' }
      >
        <CancelPresentationIcon />
      </ButtonText>
      <h2>New Event</h2>
      <ButtonPrimary className={ 'action' } onClick={ () => null }>
        Create
      </ButtonPrimary>
    </div>
  </div>
}

const GMCalendar = () => {
  const [popup, setPopup] = useState({ active: false, type: null, info: null })

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
        setPopup({ active: true, type: 'event', info: info })
      } }
    />
    <ButtonPrimary onClick={ () => setPopup({ active: true, type: 'new', info: null }) }>
      Add event
    </ButtonPrimary>
    {
      popup.active
        ? popup.type === 'new'
          ? <NewPopup setPopup={ setPopup } />
          : popup.type === 'event'
            ? <EventPopup info={ popup.info } setPopup={ setPopup } />
            : null
        : null
    }
  </>
};

export default GMCalendar;