import axios from 'axios';
import createHistory from 'history/createBrowserHistory';
const history = createHistory();
import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR
} from './types';
const ROOT_URL = 'http://localhost:3090';

function signupUser({ email, password }) {
  return dispatch => {
    axios.post(`${ROOT_URL}/signup`, { email, password })
      .then(response => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', response.data.token);
        history.push('/feature');
      })
      .catch(error => {
        dispatch(authError(error.response.data.error));
      })
  }
}

function signinUser({email, password}) {
  return dispatch => {
    // Submit email/password to the server
    axios.post(`${ROOT_URL}/signin`, { email, password })
      .then(response => {
        // If request is good...
        // - Update state to indicate is authenticated
        dispatch({ type: AUTH_USER });
        // - Save the JWT token
        localStorage.setItem('token', response.data.token);
        // - Redirect to the route '/feature'
        history.push('/feature');
      })
      .catch(() => {
        // If request is bad...
        // - Show an error to the user
        dispatch(authError('Bad Sign In Details'));
      });
  }
}

function signoutUser() {
  localStorage.removeItem('token');

  return { type: UNAUTH_USER }
}

function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

export {
  signupUser,
  signinUser,
  signoutUser,
  authError
}
