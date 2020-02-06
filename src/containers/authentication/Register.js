import React, { useRef, useState, useEffect } from 'react';
import { CircularProgress } from "@material-ui/core";
import { ButtonPrimary, ButtonText } from "../../components/Button";
import Input from "../../components/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import Mail from "@material-ui/icons/MailOutline";
import Warning from '@material-ui/icons/WarningRounded.js';
import Check from '@material-ui/icons/CheckRounded';
import PersonIcon from '@material-ui/icons/Person';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import { isEmail } from 'validator';
import { regex } from '../utils/regex';
import { api } from '../../helpers/api';
import Cross from "@material-ui/icons/NotInterested";
import Lock from '@material-ui/icons/LockOutlined';
import { history } from './../../store';
import './../../styles/authentication/register.scss'

const color = {
  default: "#d3d8e3",
  focus: "#52dccd",
};

const EndAdornment = props => {
  return props.error === true
    ? <InputAdornment position={ 'end' }>
      <Warning htmlColor={ 'rgba(199,13,15,0.85)' } />
    </InputAdornment>
    : props.error === false
      ? <InputAdornment position={ 'end' }>
        <Check htmlColor={ '#52dccd' } />
      </InputAdornment>
      : null;
};

const CheckError = (field, value) => {
  switch (field) {
    case "Username":
      return value.length < 2 || value.length > 255 || value === '';
    case "Email":
      return !isEmail(value) || value === '';
    case "Password":
      return !regex.lowercase.test(value)
        || !regex.uppercase.test(value)
        || !regex.number.test(value)
        || value.length < 8
        || value.length > 255

    default:
      return true;
  }
};

const Username = props => {
  const [colorUsername, setColorUsername] = useState(color.default);
  const [error, setError] = useState(undefined);

  return <Input
    type={ 'text' }
    placeholder={ 'Username' }
    title={ 'Username' }
    onFocus={ () => setColorUsername(color.focus) }
    onBlur={ () => {
      setColorUsername(color.default);
      setError(CheckError('Username', props.reference.current.value));
    } }
    error={ error }
    inputRef={ props.reference }
    startAdornment={
      <InputAdornment position="start">
        <PersonIcon htmlColor={ colorUsername } />
      </InputAdornment>
    }
    endAdornment={ <EndAdornment error={ error } /> }
  />
};

const Email = props => {
  const [colorEmail, setColorEmail] = useState(color.default);
  const [error, setError] = useState(undefined);

  return <Input
    type={ 'email' }
    placeholder={ 'Email' }
    title={ 'Email' }
    onFocus={ () => setColorEmail(color.focus) }
    onBlur={ () => {
      setColorEmail(color.default);
      setError(CheckError('Email', props.reference.current.value));
    } }
    error={ error }
    inputRef={ props.reference }
    startAdornment={
      <InputAdornment position="start">
        <Mail htmlColor={ colorEmail } />
      </InputAdornment>
    }
    endAdornment={ <EndAdornment error={ error } /> }
  />
};

const Password = props => {
  const [colorPassword, setColorPassword] = useState(color.default);
  const [error, setError] = useState(undefined)

  return <Input
    type={ 'password' }
    placeholder={ props.placeholder }
    title={ props.title }
    onFocus={ () => setColorPassword(color.focus) }
    onBlur={ () => {
      setColorPassword(color.default);

      props.password
        ? setError(props.password.current.value === props.reference.current.value ? false : true)
        : setError(CheckError('Password', props.reference.current.value))
    } }
    inputRef={ props.reference }
    startAdornment={
      <InputAdornment position="start" >
        <Lock htmlColor={ colorPassword } />
      </InputAdornment>
    }
    endAdornment={ <EndAdornment error={ error } /> }
  />
};

const sendForm = (username, email, role, password, confirmPassword, setStateRequest) => {
  setStateRequest("PROGRESS")

  if (!CheckError("Username", username) && !CheckError("Email", email) && !CheckError("Password", password) && password === confirmPassword && (role === 'player' || role === 'gamemaster')) {

    api.post('/auth/register', {
      username: username,
      email: email,
      password: password,
      role: role
    }).then(res => {
      console.log('OK')
      setStateRequest("SUCCESS")
    }).catch((err) => {
      console.log(err)
      setStateRequest("FAILURE")
    })
  } else {
    setStateRequest("FAILURE")
  }
};

const RegisterForm = () => {
  const username = useRef(null);
  const email = useRef(null);
  const [role, setRole] = useState('')
  const password = useRef(null);
  const confirmPassword = useRef(null);
  const [stateRequest, setStateRequest] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setStateRequest(null)
    }, 3000);
  }, [stateRequest]);

  return <div>
    <p className={ 'message' }>Register freely to our platform by completing the form below!</p>
    <hr />
    <Username reference={ username } />
    <Email reference={ email } />
    <Password reference={ password } placeholder={ 'Password' } title={ 'Password' } />
    <Password reference={ confirmPassword } placeholder={ 'Confirm Password' } title={ 'Confirm Password' } password={ password } />
    <p className={ 'role-label' }>What is your role?</p>
    <div className={ 'role' }>
      <ButtonText onClick={ () => setRole('player') } style={ role !== 'player' ? { color: 'white' } : null }>
        { role === 'player' ? <RadioButtonCheckedIcon /> : <RadioButtonUncheckedIcon /> }
        I'm a Player
      </ButtonText>
      <ButtonText onClick={ () => setRole('gamemaster') } style={ role !== 'gamemaster' ? { color: 'white' } : null }>
        I'm a Game Master
        { role === 'gamemaster' ? <RadioButtonCheckedIcon /> : <RadioButtonUncheckedIcon /> }
      </ButtonText>
    </div>
    <div className={ 'confirm-form' }>
      <ButtonPrimary
        onClick={ () => sendForm(username.current.value, email.current.value, role, password.current.value, confirmPassword.current.value, setStateRequest) }
        disabled={ stateRequest === 'SUCCESS' }
        className={ 'connect' }
        style={ stateRequest === 'FAILURE' ? { backgroundColor: 'rgba(199,13,15,0.85)' } : null }
      >
        { stateRequest === null ? "Create Account"
          : stateRequest === "PROGRESS"
            ? <CircularProgress />
            : stateRequest === "SUCCESS"
              ? <Check />
              : <Cross />
        }
      </ButtonPrimary>
      { stateRequest === 'FAILURE'
        ? <p className={ 'error-message' }>Seems like one or more of your information is invalid.</p>
        : stateRequest === 'SUCCESS'
          ? <p className={ 'success-message' }>Account successfully created.</p>
          : null }
    </div>
    <div className={ 'change-auth' }>
      <p>Already have an account?</p>
      <ButtonText onClick={ () => history.push('/login') }>Connect now!</ButtonText>
    </div>
  </div>
};

const Register = () => {
  return <main className={ 'auth' }>
    <h1>Welcome to RPG Calendar</h1>
    <RegisterForm />
  </main>
}

export default Register;