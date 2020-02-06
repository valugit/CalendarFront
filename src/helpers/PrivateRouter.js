import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter, Route, Redirect } from 'react-router';
import { api } from './api';
import history from './../store';

const authentication = dispatch => {
  api.get('/user/profile', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    }
  }).then(json => {
    const user = json.data[0]
    dispatch({ type: 'LOGIN', id: user.id, username: user.username, email: user.email, role: user.role })
  }).catch(err => {
    console.log(err)
    localStorage.clear()
    history.push('/login')
  })
}

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);
  const dispatch = useDispatch()

  useEffect(() => {
    if (localStorage.getItem('token') && localStorage.getItem('keep_logged') === "true" && !isAuthenticated) authentication(dispatch)
  }, [isAuthenticated])

  return <Route
    { ...rest }
    render={ props => (
      isAuthenticated
        ? <Component { ...props } />
        : localStorage.getItem('token')
          ? null
          : <Redirect to='/login' />
    ) }
  />
};

export default withRouter(PrivateRoute);
