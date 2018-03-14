import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider } from 'react-redux';
import { configureStore } from './store/configureStore';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      <App />
    </MuiThemeProvider>
  </Provider>
  , document.querySelector('.container-fluid'));
