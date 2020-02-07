import React, { useState } from 'react';
import { ButtonPrimary, ButtonText } from './../../../components/Button';
import Input from './../../../components/Input';
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';
import moment from 'moment';

const color = {
  default: "#d3d8e3",
  focus: "#52dccd",
};

const Text = props => {
  const [colorTitle, setColorTitle] = useState(color.default);

  return <Input
    type={ 'text' }
    placeholder={ props.placeholder }
    onFocus={ () => setColorTitle(color.focus) }
    onBlur={ () => setColorTitle(color.default) }
    style={ { borderColor: colorTitle } }
  />
};

const Game = ({ game, setGame }) => {
  const [colorSelect, setColorSelect] = useState(color.default);
  const [open, setOpen] = useState(false)

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
        <ButtonText onClick={ () => {
          setGame({ id: 1, name: 'game1' })
          setOpen(false)
        } }
        >
          Game 1
        </ButtonText>
        <ButtonText onClick={ () => {
          setGame({ id: 2, name: 'game2' })
          setOpen(false)
        } }
        >
          Game 2
        </ButtonText>
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
      defaultValue={ moment().format('YYYY-MM-DDTHH:mm') }
    />
  </div>
};

const NewPopup = ({ setPopup }) => {
  const [game, setGame] = useState({})

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
        <Text placeholder={ 'Your title' } />
        <Text placeholder={ 'Maybe a description' } />
        <Game game={ game } setGame={ setGame } />
        <Time id={ 'start' } label={ 'Start' } />
        <Time id={ 'end' } label={ 'End' } />
      </div>
      <ButtonPrimary className={ 'action' } onClick={ () => null }>
        Create
      </ButtonPrimary>
    </div>
  </div>
}

export default NewPopup;