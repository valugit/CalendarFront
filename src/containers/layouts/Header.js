import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ButtonText } from './../../components/Button';
import { history } from './../../store';
import './../../styles/layouts/header.scss';

const logout = dispatch => {
  localStorage.clear()
  dispatch({ type: 'LOGOUT' })

  history.push('/login')
}

const Header = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  return <header>
    <h1>RPG Calendar</h1>
    { user.role === 'player'
      ? <div>
        <ButtonText onClick={ () => history.push('/') }>Home</ButtonText>
        <ButtonText onClick={ () => null }>Booking</ButtonText>
      </div>
      : null
    }
    <div>
      <p>Hello, { user.username }!</p>
      <ButtonText onClick={ () => null }>Profile</ButtonText>
      <ButtonText onClick={ () => logout(dispatch) }>Logout</ButtonText>
    </div>
  </header>
}

export default Header;