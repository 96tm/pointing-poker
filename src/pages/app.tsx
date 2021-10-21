import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { appSelectors, currentUserSelectors } from '../redux/selectors';
import { TUserRole } from '../redux/types';
import { APP_CONSTANTS } from '../shared/constants';
import { GamePage } from './game/game-page';
import GameResult from './game-result/game-result';
import DealerLobby from './lobby/dealer-lobby/dealer-lobby';
import PlayerLobby from './lobby/player-lobby';
import Footer from './shared/footer/footer';
import Header from './shared/header/header';
import InfoMessageList from './shared/info-message-list/info-message-list';
import LoadSpinner from './shared/spinner/spinner';
import WelcomePage from './welcome/welcome';
import styles from './app.module.scss';

function App(): JSX.Element {
  const currentUser = useSelector(currentUserSelectors.selectCurrentUser);
  const isLoading = useSelector(appSelectors.selectIsLoading);
  const location = useLocation();
  const lobbyPage =
    currentUser.role === TUserRole.dealer ? <DealerLobby /> : <PlayerLobby />;

  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.content}>
        <InfoMessageList />
        {isLoading && <LoadSpinner />}
        <TransitionGroup className={styles.transitionGroup}>
          <CSSTransition
            timeout={APP_CONSTANTS.ROUTER_TRANSITION_TIMEOUT}
            classNames={{
              enter: styles.containerEnter,
              enterActive: styles.containerEnterActive,
              exit: styles.containerExit,
              exitActive: styles.containerExitActive,
              appear: styles.containerEnter,
              appearActive: styles.containerEnterActive,
            }}
            mountOnEnter={true}
            unmountOnExit={true}
            in={true}
            appear={true}
            key={location.pathname}
          >
            <Switch location={location}>
              <Route exact path="/">
                <div className={styles.container}>
                  <WelcomePage />
                </div>
              </Route>
              <Route path="/game-result/">
                <div className={styles.container}>
                  <GameResult />
                </div>
              </Route>
              <Route path="/game/:gameId">
                <div className={styles.container}>
                  <GamePage />
                </div>
              </Route>
              <Route path="/lobby/:gameId">{lobbyPage}</Route>
              <Route path="*">
                <WelcomePage />
              </Route>
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      </main>
      <Footer />
    </div>
  );
}

export default App;
