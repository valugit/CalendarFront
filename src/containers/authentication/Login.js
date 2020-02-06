import React, { useRef, useState, useEffect } from 'react';
import { CircularProgress } from "@material-ui/core";
import { ButtonPrimary, ButtonText } from "../../components/Button";
import Input from "../../components/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import Warning from '@material-ui/icons/WarningRounded.js';
import Check from '@material-ui/icons/CheckRounded';
import PersonIcon from '@material-ui/icons/Person';
import { isEmail } from 'validator';
import { regex } from '../utils/regex';
import { api } from '../../helpers/api';
import Cross from "@material-ui/icons/NotInterested";
import Lock from '@material-ui/icons/LockOutlined';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { history } from './../../store';
import './../../styles/authentication/login.scss';
import { useDispatch } from 'react-redux';

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

const Password = props => {
  const [colorPassword, setColorPassword] = useState(color.default);
  const [error, setError] = useState(undefined)

  return <Input
    type={ 'password' }
    placeholder={ 'Password' }
    title={ 'Password' }
    onFocus={ () => setColorPassword(color.focus) }
    onBlur={ () => {
      setColorPassword(color.default);
      setError(CheckError('Password', props.reference.current.value))
    } }
    inputRef={ props.reference }
    startAdornment={
      <InputAdornment position="start" >
        <Lock htmlColor={ colorPassword } />
      </InputAdornment >
    }
    endAdornment={ <EndAdornment error={ error } /> }
  />
};

const sendForm = (username, password, check, setStateRequest, dispatch) => {
  setStateRequest('PROGRESS')

  if (!CheckError("Username", username) && !CheckError("Password", password))

    api.post('/auth/login', {
      username: username,
      password: password
    }).then(res => {
      localStorage.setItem('token', res.data.access_token);
      localStorage.setItem('keep_logged', check);

      api.get('/user/profile', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      }).then(json => {
        setStateRequest('SUCCESS')

        const user = json.data[0]
        dispatch({ type: 'LOGIN', id: user.id, username: user.username, email: user.email, role: user.role })

        setTimeout(() => {
          return history.push('/')
        }, 3000);
      }).catch(err => {
        console.log(err)
      })
    }).catch((err) => {
      console.log(err)
      setStateRequest("FAILURE")
    })
  else
    setStateRequest("FAILURE")
};

const LoginForm = () => {
  const username = useRef(null);
  const password = useRef(null);
  const [check, setCheck] = useState(false)
  const [stateRequest, setStateRequest] = useState(null);
  const dispatch = useDispatch()

  useEffect(() => {
    setTimeout(() => {
      setStateRequest(null)
    }, 3000);
  }, [stateRequest]);

  return <div>
    <p className={ 'message' }>Please login to access to your space.</p>
    <hr />
    <Username reference={ username } />
    <Password reference={ password } />
    <ButtonText onClick={ () => setCheck(!check) } className={ 'keep-login' }>
      { check ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon /> }
      Keep me login
    </ButtonText>
    <div className={ 'confirm-form' }>
      <ButtonPrimary
        onClick={ () => sendForm(username.current.value, password.current.value, check, setStateRequest, dispatch) }
        disabled={ stateRequest === 'SUCCESS' }
        className={ 'connect' }
        style={ stateRequest === 'FAILURE' ? { backgroundColor: 'rgba(199,13,15,0.85)' } : null }
      >
        { stateRequest === null ? "Connect"
          : stateRequest === "PROGRESS"
            ? <CircularProgress />
            : stateRequest === "SUCCESS"
              ? <Check />
              : <Cross />
        }
      </ButtonPrimary>
      { stateRequest === 'FAILURE'
        ? <p className={ 'error-message' }>Seems like one or more of your information is invalid.</p>
        : null }
    </div>
    <div className={ 'change-auth' }>
      <p>No account yet?</p>
      <ButtonText onClick={ () => history.push('/register') }>Create one!</ButtonText>
    </div>
  </div>
};

const Login = () => {
  return <main className={ 'auth' }>
    <h1>Welcome to RPG Calendar</h1>
    <LoginForm />
  </main>
}

export default Login;