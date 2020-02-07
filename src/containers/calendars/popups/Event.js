import React from 'react'
import { ButtonPrimary, ButtonText } from './../../../components/Button';
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';

const EventPopup = ({ info, setPopup }) => {
  return <div className={ 'popup' }>
    <div>
      <ButtonText
        onClick={ () => setPopup({ type: null, info: null }) }
        className={ 'close' }
      >
        <CancelPresentationIcon />
      </ButtonText>
      <h2>{ info.event.title }</h2>
      <div className={ 'info' }>
        <div>
          <span>Description:</span>
          <span>{ info.event.extendedProps.description }</span>
        </div>
        <div>
          <span>Game:</span>
          <span>{ info.event.extendedProps.game }</span>
        </div>
        <div>
          <span>Players:</span>
          <span>{ info.event.extendedProps.players }</span>
        </div>
        <div>
          <span>Schedule:</span>
          <span>{ `${info.event.start.getHours()}:${info.event.start.getMinutes()}` } - { `${info.event.end.getHours()}:${info.event.end.getMinutes()}` }</span>
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

export default EventPopup;