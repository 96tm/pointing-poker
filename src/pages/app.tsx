import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { currentUserSelectors } from '../redux/selectors';
import { TUserRole } from '../redux/types';
import { APP_CONSTANTS } from '../shared/constants';
import styles from './app.module.scss';
import GameResult from './game-result/game-result';
import { GamePage } from './game/game-page-player/game-page';
import PlayerLobby from './lobby/player-lobby';
import Footer from './shared/footer/footer';
import Header from './shared/header/header';
import WelcomePage from './welcome/welcome';

function App(): JSX.Element {
  const currentUser = useSelector(currentUserSelectors.selectCurrentUser);

  return (
    <div className={styles.app}>
      <Router>
        <Header />
        <main className={styles.content}>
          <TransitionGroup className="transition-group">
            <CSSTransition
              timeout={APP_CONSTANTS.ROUTER_TRANSITION_TIMEOUT}
              classNames="page"
            >
              <Switch>
                <Route exact path="/">
                  <WelcomePage />
                </Route>
                <Route exact path="/game/result">
                  <GameResult />
                </Route>
                <Route path="/game/:gameId">
                  {currentUser.role === TUserRole.dealer ? (
                    <GamePage />
                  ) : (
                    <div>Game page</div>
                  )}
                </Route>
                <Route path="/lobby/:gameId">
                  {currentUser.role === TUserRole.dealer ? (
                    <div>Lobby page dealer</div>
                  ) : (
                    <PlayerLobby />
                  )}
                </Route>
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
