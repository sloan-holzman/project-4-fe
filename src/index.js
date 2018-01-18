import React from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter as Router
} from "react-router-dom"

import App from './containers/App';
import { Provider } from 'react-redux'
import store from './store'



store.subscribe(() => console.log(store.getState()))


ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
