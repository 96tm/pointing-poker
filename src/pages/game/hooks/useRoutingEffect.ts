import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import { gameSelectors } from '../../../redux/selectors';
import { TGameStatus } from '../../../redux/types';
import { gameService } from '../../../shared/services/game-service/game-service';

export default function useRoutingEffect(
  isGameFinished: boolean,
  setShowRoundResult: React.Dispatch<React.SetStateAction<boolean>>
): void {
  const history = useHistory();
  const issues = useSelector(gameSelectors.selectIssues);
  const gameStatus = useSelector(gameSelectors.selectStatus);
  const [lastGameStatus, setLastGameStatus] = useState(gameStatus);

  useEffect(() => {
    switch (gameStatus) {
      case TGameStatus.inactive:
        {
          if (!isGameFinished) {
            history.replace('/');
          } else {
            history.replace('/game-result', { issues });
          }
          gameService.resetState();
        }
        break;
      case TGameStatus.started:
        if (lastGameStatus === TGameStatus.roundInProgress) {
          setLastGameStatus(TGameStatus.started);
          setShowRoundResult(true);
        }
        break;
      case TGameStatus.roundInProgress:
        setLastGameStatus(TGameStatus.roundInProgress);
        setShowRoundResult(false);
        break;
      default:
        break;
    }
  }, [gameStatus]);
}
