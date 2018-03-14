import {
  TODOS_SUCCESS
} from '../constants';

const initialState = {
  todos: [],
}

export default (state = initialState, action) => {
  console.log('action in home reducer ', action);
  switch(action.type) {
    case TODOS_SUCCESS:
      return { ...state, todos: action.payload };

    default:
      return state;
  }
}
