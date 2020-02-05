import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import "../static/styles.css";
import App from "./App";
import configureStore from "../store/configureStore";
import * as serviceWorker from "./serviceWorker";

const store = configureStore();

function Root() {
  return (
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  );
}

export default Root;
serviceWorker.unregister();
