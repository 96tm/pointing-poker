import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { appSelectors } from '../redux/selectors';
import { APP_CONSTANTS } from '../shared/constants';
import GameResult from './game-result/game-result';
import { GamePage } from './game/game-page';
import LobbyPage from './lobby/lobby-page';
import Footer from './shared/footer/footer';
import Header from './shared/header/header';
import InfoMessageList from './shared/info-message-list/info-message-list';
import LoadSpinner from './shared/spinner/spinner';
import WelcomePage from './welcome/welcome';
import styles from './app.module.scss';

export default function App(): JSX.Element {
  const isLoading = useSelector(appSelectors.selectIsLoading);
  const location = useLocation();

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
              <Route path="/lobby/:gameId">
                <LobbyPage />
              </Route>
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
