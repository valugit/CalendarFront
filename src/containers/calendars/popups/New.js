import React, { useState, useEffect, useRef } from 'react';
import { ButtonPrimary, ButtonText } from './../../../components/Button';
import Input from './../../../components/Input';
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';
import moment from 'moment';
import { isISO8601 } from 'validator';
import { api } from './../../../helpers/api';
import Cross from "@material-ui/icons/NotInterested";
import Check from '@material-ui/icons/CheckRounded';
import { CircularProgress } from "@material-ui/core";

const color = {
  default: "#d3d8e3",
  focus: "#52dccd",
};

const getGames = setGames => {
  api.get(`/game/all`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    }
  }).then(json => {
    setGames(json.data)
  }).catch(err => {
    console.log(err)
  })
}

const Text = props => {
  const [colorTitle, setColorTitle] = useState(color.default);

  return <Input
    type={ 'text' }
    inputRef={ props.reference }
    placeholder={ props.placeholder }
    onFocus={ () => setColorTitle(color.focus) }
    onBlur={ () => {
      setColorTitle(color.default)
      console.log(props.reference.current.value)
    } }
    style={ { borderColor: colorTitle } }
  />
};

const Game = ({ game, setGame }) => {
  const [colorSelect, setColorSelect] = useState(color.default);
  const [games, setGames] = useState([])
  const [open, setOpen] = useState(false)

  useEffect(() => {
    getGames(setGames)
  }, [])

  return <div className={ 'select-game' }>
    <ButtonText
      onClick={ () => setOpen(!open) }
      onFocus={ () => setColorSelect(color.focus) }
      onBlur={ () => setColorSelect(color.default) }
      style={ { borderColor: colorSelect } }
      className={ 'select-button' }
    >
      { game.name ? game.name : 'Select a game' }
    </ButtonText>
    { open
      ? <div>
        { games.map(game => (
          <ButtonText key={ game.id }
            onClick={ () => {
              setGame({ id: game.id, name: game.name })
              setOpen(false)
            } }
          >
            { game.name }
          </ButtonText>
        )) }
      </div>
      : null }
  </div>
};

const Time = props => {
  return <div>
    <label htmlFor={ props.id }>{ props.label }:</label>
    <Input
      id={ props.id }
      type="datetime-local"
      inputRef={ props.reference }
      defaultValue={ moment().format('YYYY-MM-DDTHH:mm') }
      onChange={ () => console.log(props.reference.current.value) }
    />
  </div>
};

const sendForm = (title, description = '', game, start, end, setStateRequest) => {
  setStateRequest("PROGRESS")

  if (title !== null && description !== null && game.id !== null && isISO8601(start) && isISO8601(end)) {
    // && moment(start).isBefore(end)

    api.post('/seance/add', {
      title: title,
      description: description,
      seance_game: game.id,
      start: moment(start).toISOString(),
      end: moment(end).toISOString(),
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    }).then(res => {
      if (res.data.status !== 400) {
        setStateRequest("SUCCESS")
        window.location.reload()
      } else {
        setStateRequest("FAILURE")
      }
    }).catch((err) => {
      console.log(err)
      setStateRequest("FAILURE")
    })
  } else {
    setStateRequest("FAILURE")
  }
};

const NewPopup = ({ setPopup }) => {
  const title = useRef('')
  const description = useRef('')
  const [game, setGame] = useState({})
  const start = useRef('')
  const end = useRef('')
  const [stateRequest, setStateRequest] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setStateRequest(null)
    }, 3000);
  }, [stateRequest]);

  return <div className={ 'popup' }>
    <div>
      <ButtonText
        onClick={ () => setPopup({ type: null, info: null }) }
        className={ 'close' }
      >
        <CancelPresentationIcon />
      </ButtonText>
      <h2>New Event</h2>
      <div className={ 'new' }>
        <Text placeholder={ 'Your title' } reference={ title } />
        <Text placeholder={ 'Maybe a description' } reference={ description } />
        <Game game={ game } setGame={ setGame } />
        <Time id={ 'start' } label={ 'Start' } reference={ start } />
        <Time id={ 'end' } label={ 'End' } reference={ end } />
      </div>
      <ButtonPrimary
        onClick={ () => sendForm(title.current.value, description.current.value, game, start.current.value, end.current.value, setStateRequest) }
        disabled={ stateRequest === 'SUCCESS' }
        className={ 'action' }
        style={ stateRequest === 'FAILURE' ? { backgroundColor: 'rgba(199,13,15,0.85)' } : null }
      >
        {
          stateRequest === null ? "Create"
            : stateRequest === "PROGRESS"
              ? <CircularProgress />
              : stateRequest === "SUCCESS"
                ? <Check />
                : <Cross />
        }
      </ButtonPrimary>
    </div>
  </div>
}

export default NewPopup;