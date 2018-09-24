import {
  GIFS_SUCCESS
} from '../constants';

const initialState = {
  gifs: [],
}

export default (state = initialState, action) => {
  switch(action.type) {
    case GIFS_SUCCESS:
      return { ...state, gifs: action.payload };

    default:
      return state;
  }
}
