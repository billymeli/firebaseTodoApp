import { reducer as formReducer } from 'redux-form';
import { combineReducers } from 'redux';
import AuthReducer from './auth';
import GifBrowserReducer from './GifBrowserReducer';
import MyGifsReducer from './MyGifsReducer';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  gifBrowser: GifBrowserReducer,
  myGifs: MyGifsReducer,
  auth: AuthReducer,
  form: formReducer,
  router: routerReducer
});

export default rootReducer;
