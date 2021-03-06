import {
  PAUSE,
  RESUME
 } from '../types';

const initialState = false;

const isPausedReducer = (state = initialState, action) => {
  switch (action.type) {
    case PAUSE:
      return true;
    case RESUME:
      return false;
    default:
      return state;
  }
};

export default isPausedReducer;
