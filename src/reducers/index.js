import { reducer as formReducer } from 'redux-form';
import { combineReducers } from 'redux';
import AuthReducer from './auth';
import NewTodoReducer from './NewTodoReducer';
import HomeReducer from './HomeReducer';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  home: HomeReducer,
  newTodo: NewTodoReducer,
  auth: AuthReducer,
  form: formReducer,
  router: routerReducer
});

export default rootReducer;
