import axios from 'axios'
import jwt_decode from 'jwt-decode'

import { GET_ERRORS, SET_CURRENT_USER } from './types'

import setAuthToken from '../utils/setAuthToken'

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post('/api/users/register', userData)
    .then(res => history.push('/login'))
    .catch(e => dispatch({
      type: GET_ERRORS,
      payload: e.response.data
    }))
}

// Login - Get User Token
export const loginUser = userData => dispatch => {
  axios
    .post('/api/users/login', userData)
    .then(res => {
      // Save to localStorage
      const { token } = res.data

      localStorage.setItem('jwtToken', token)

      // set token to Auth header
      setAuthToken(token)

      // decode token to get user data
      const decoded = jwt_decode(token)

      // set current user
      dispatch(setCurrentUser(decoded))
    })
    .catch(e => dispatch({
      type: GET_ERRORS,
      payload: e.response.data
    }))
}

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
}

// Log user out
export const logoutUser = () => dispatch => {
  // remove token from localStorage
  localStorage.removeItem('jwtToken')

  // remove auth header for future requests
  setAuthToken(false)

  // set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}))
}
