import {
  FORM_INPUT_CHANGED,
  DATE_INPUT_CHANGED,
  TIME_INPUT_CHANGED,
} from '../constants';

const initialState = {
  title: '',
  description: '',
  date: null,
  time: null,
};

export default (state = initialState, action) => {
  console.log('action ', action);
  switch(action.type) {
    case FORM_INPUT_CHANGED:
      return { ...state, [action.payload.key]: action.payload.value };

    case DATE_INPUT_CHANGED:
      return { ...state, date: action.payload };

    case TIME_INPUT_CHANGED:
      return { ...state, time: action.payload };

    default:
      return state;
  }
};
