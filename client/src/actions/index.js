import axios from 'axios';
import { FETCH_USER } from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user'); // res is the response from axios
  dispatch({
    type: FETCH_USER,
    payload: res.data
  });
};
