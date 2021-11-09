import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './pages/app';
import { store } from './redux/store';
import ErrorBoundary from './pages/error-boundary';
import { gameService } from './shared/services/game-service/game-service';
import * as serviceWorker from './shared/serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import './shared/assets/css/base.scss';

gameService.init();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorBoundary>
        <Router>
          <App />
        </Router>
      </ErrorBoundary>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
