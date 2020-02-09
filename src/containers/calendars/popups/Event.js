import React, { useState, useEffect } from 'react'
import { ButtonPrimary, ButtonText } from './../../../components/Button';
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';
import { useSelector } from 'react-redux';
import { api } from './../../../helpers/api';
import Cross from "@material-ui/icons/NotInterested";
import Check from '@material-ui/icons/CheckRounded';
import { CircularProgress } from "@material-ui/core";

const deleteSeance = (id, setStateRequest) => {
  api.post(`/seance/delete`, {
    seance_id: id,
  }, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    }
  }).then(json => {
    setStateRequest("SUCCESS")
    window.location.reload()
  }).catch(err => {
    console.log(err)
    setStateRequest("FAILURE")
  })
}

const EventPopup = ({ info, setPopup }) => {
  const [stateRequest, setStateRequest] = useState(null);
  const user = useSelector(state => state.user)

  useEffect(() => {
    setTimeout(() => {
      setStateRequest(null)
    }, 3000);
  }, [stateRequest]);

  return <div className={ 'popup' }>
    <div>
      <ButtonText onClick={ () => setPopup({ type: null, info: null }) } className={ 'close' }>
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
      {
        user.role === 'player'
          ? <ButtonPrimary onClick={ () => info.event.extendedProps.players >= 8 ? console.log('ok') : null }
            className={ 'action' }
          >
            Join
            </ButtonPrimary>
          : <ButtonPrimary onClick={ () => deleteSeance(info.event.id, setStateRequest) }
            className={ 'action delete' }
            disabled={ stateRequest === 'SUCCESS' }
            style={ stateRequest === 'FAILURE' ? { backgroundColor: 'rgba(199,13,15,0.85)' } : null }
          >
            {
              stateRequest === null ? "Delete"
                : stateRequest === "PROGRESS"
                  ? <CircularProgress />
                  : stateRequest === "SUCCESS"
                    ? <Check />
                    : <Cross />
            }
          </ButtonPrimary>
      }
    </div>
  </div>
}

export default EventPopup;