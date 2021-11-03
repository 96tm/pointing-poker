import React, { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { gameSelectors } from '../../redux/selectors';
import { appActions } from '../../redux/slices/app/app-slice';
import { AppDispatch } from '../../redux/store';
import { thunks } from '../../redux/thunks/thunks';
import { TGameStatus } from '../../redux/types';
import { InfoMessage, TInfoMessageType } from '../../redux/types/info-message';
import logoGame from '../../shared/assets/icons/logo.svg';
import { APP_CONSTANTS } from '../../shared/constants';
import { ICheckGameResponse, IResponse } from '../../shared/services/types';
import ConnectToLobby from './connect-to-lobby/connect-to-lobby';
import CreateGame from './create-game/create-game';
import WelcomeForm from './welcome-form/welcome-form';
import styles from './welcome.module.scss';

const WelcomePage = (): JSX.Element => {
  const [gameURL, setGameURL] = useState('');
  const [gameId, setGameId] = useState('');
  const [isLobbyConnectShown, setIsLobbyConnectShown] = useState(false);
  const [isNewGameShown, setIsNewGameShown] = useState(false);
  const gameStatus = useSelector(gameSelectors.selectStatus);
  const history = useHistory();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (gameStatus === TGameStatus.lobby) {
      history.replace(`/lobby/${gameId}`);
    } else if (
      [TGameStatus.started, TGameStatus.roundInProgress].includes(gameStatus)
    ) {
      history.replace(`/game/${gameId}`);
    }
  }, [gameStatus]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setGameURL(e.target.value);
  };

  const testUrl = (url: string): boolean => {
    const URLQuery = new RegExp(APP_CONSTANTS.URL_REGEXP);
    const gameURLQuery = new RegExp(APP_CONSTANTS.GAME_URL_REGEXP);
    const test = URLQuery.test(url) && gameURLQuery.test(url);
    if (!test) {
      dispatch(
        appActions.addOneInfoMessage(
          new InfoMessage(
            `Incorrect gameURL!`,
            TInfoMessageType.error
          ).toObject()
        )
      );
      return false;
    }
    return true;
  };

  const handleClickNewGame = async () => {
    setIsNewGameShown(true);
  };

  const handleClickConnect = async () => {
    const isUrlValid = testUrl(gameURL);
    if (isUrlValid) {
      const gameIdLocal = gameURL.split('/').slice(-1)[0];
      const response = await dispatch(
        thunks.checkGameThunk({ gameId: gameIdLocal })
      );
      const payload = response.payload as ICheckGameResponse;
      if (payload.message) {
        dispatch(
          appActions.addOneInfoMessage(
            new InfoMessage(
              `Can't connect to server`,
              TInfoMessageType.error,
              false
            ).toObject()
          )
        );
        return;
      }
      const { gameExists } = payload;
      setIsLobbyConnectShown(gameExists);
      if (!gameExists) {
        dispatch(
          appActions.addOneInfoMessage(
            new InfoMessage(
              `Game with id '${gameId}' is not found`,
              TInfoMessageType.error
            ).toObject()
          )
        );
      } else {
        const connectionResponse = await dispatch(thunks.connectThunk());
        const { message } = connectionResponse.payload as IResponse;
        if (message) {
          dispatch(
            appActions.addOneInfoMessage(
              new InfoMessage(
                `Can't connect to server`,
                TInfoMessageType.error
              ).toObject()
            )
          );
          return;
        }
        setGameId(gameIdLocal);
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <ConnectToLobby
          isShown={isLobbyConnectShown}
          gameId={gameId}
          handleCancelClick={() => setIsLobbyConnectShown(false)}
        />
        <CreateGame
          isShown={isNewGameShown}
          handleCancelClick={() => setIsNewGameShown(false)}
        />
        <div className={styles.wrapperLogo}>
          <img src={logoGame} className={styles.logo} alt="logo game"></img>
        </div>
        <WelcomeForm
          handleClickNewGame={handleClickNewGame}
          handleClickConnect={handleClickConnect}
          handleChange={handleChange}
          gameURL={gameURL}
        />
      </div>
    </div>
  );
};

export default WelcomePage;
