import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router
} from "react-router-dom"

import App from './components/App';
import { Provider } from 'react-redux'
import store from './store'



console.log(store.getState())
store.subscribe(() => console.log(store.getState()))


ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
