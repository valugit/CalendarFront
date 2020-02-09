import React, { useState, useEffect } from 'react';
import { api } from '../helpers/api';
import GMCalendar from './calendars/GMCalendar';
import { ButtonText } from '../components/Button';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import moment from 'moment';
import { history } from '../store';

const closestSeances = seances => {
  let nextSevenDays = []
  let i = 0

  while (i < seances.length) {
    if (moment(seances[i].start).isBefore(moment().add(7, 'days')))
      nextSevenDays.push(seances[i])

    i++
  }

  return nextSevenDays
}

const getAll = setGameMasters => {
  api.get('/gamemaster/all', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    }
  }).then(res => {
    setGameMasters(res.data)
  }).catch(err => {
    console.log(err)
  })
}

const GMPreview = ({ info }) => {
  const [seances, setSeances] = useState([])

  useEffect(() => {
    setSeances(closestSeances(info.gm_seances))
  }, [])

  return <div className={ 'gameMaster' }>
    <div className={ 'GMInfos' }>
      <div>
        <h2>
          <AccountBoxIcon />
          { info.username }
        </h2>
        <h3>Seances scheduled in the next 7 days: { seances.length }</h3>
      </div>
      <ButtonText onClick={ () => history.push('/' + info.id) }>
        See all scheduled seances >>
      </ButtonText>
    </div>
    <div className={ 'GMCalendarPreview' }>
      { seances.length !== 0
        ? <GMCalendar id={ info.id } interactive={ false } defaultView={ "timeGridWeek" } views={ 'timeGridWeek,timeGridDay,listMonth' } />
        : <span>No seance found in the next 7 days.</span> }
    </div>
  </div>
}

const GMList = () => {
  const [gameMasters, setGameMasters] = useState([])

  useEffect(() => {
    getAll(setGameMasters)
  }, [])

  return <div className={ 'GMList' }>
    {
      gameMasters.length !== 0
        ? gameMasters.map(gm => <GMPreview key={ gm.id } info={ gm } />)
        : <span>No Game Master found.</span>
    }
  </div>
}

export default GMList;