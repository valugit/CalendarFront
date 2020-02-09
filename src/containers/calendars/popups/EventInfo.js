import React from 'react'
import { ButtonText } from './../../../components/Button';
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';

const EventInfoPopup = ({ info, setPopup }) => (
  <div className={ 'popup' }>
    <div>
      <ButtonText onClick={ () => setPopup({ active: false, info: null }) } className={ 'close' }>
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
          <span>{ info.event.extendedProps.players } { info.event.extendedProps.players >= 8 ? '(full)' : null }</span>
        </div>
        <div>
          <span>Schedule:</span>
          <span>{ `${info.event.start.getHours()}:${info.event.start.getMinutes()}` } - { `${info.event.end.getHours()}:${info.event.end.getMinutes()}` }</span>
        </div>
      </div>
    </div>
  </div>
)

export default EventInfoPopup;