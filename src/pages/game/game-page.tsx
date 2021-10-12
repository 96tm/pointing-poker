import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import {
  currentUserSelectors,
  gamePageSelectors,
  gameSelectors,
  gameSettingsSelectors,
  votingKickSelectors,
} from '../../redux/selectors';
import { entryRequestSelectors } from '../../redux/selectors/entry-request-selectors';
import { appActions } from '../../redux/slices/app/app-slice';
import { entryRequestsActions } from '../../redux/slices/entry-requests/entry-requests';
import { AppDispatch } from '../../redux/store';
import { thunks } from '../../redux/thunks/thunks';
import {
  IRequestResult,
  IUser,
  TGameStatus,
  TUserRole,
  User,
} from '../../redux/types';
import { InfoMessage, TInfoMessageType } from '../../redux/types/info-message';
import { BasePopup } from '../shared/base-popup/base-popup';
import Deck from '../shared/cards/deck';
import DealerSection from '../shared/dealer-section/dealer-section';
import SideBar from '../shared/side-bar/side-bar';
import SprintHeading from '../shared/sprint-heading/sprint-heading';
import GameControls from './game-controls/game-controls';
import IssuesList from './issues-list/issues-list';
import IssueStatistics from './statistics/issue-statistics';
import styles from './game-page.module.scss';
import { gameService } from '../../shared/services/game-service/game-service';

export function GamePage(): JSX.Element {
  const history = useHistory();
  const dispatch = useDispatch<AppDispatch>();
  const [isGameFinished, setIsGameFinished] = useState(false);
  const isSideBarShown = useSelector(gamePageSelectors.selectIsSideBarShown);
  const gameStatus = useSelector(gameSelectors.selectStatus);
  const gameId = useSelector(gameSelectors.selectId);
  const [lastGameStatus, setLastGameStatus] = useState(gameStatus);
  const issues = useSelector(gameSelectors.selectIssues);
  const dealer = useSelector(gameSelectors.selectDealer) as IUser;
  const currentIssue = useSelector(gameSelectors.selectCurrentIssue);
  const firstRender = useRef<boolean>(true);
  const gameSettings = useSelector(gameSettingsSelectors.selectSettings);
  const currentUser = useSelector(currentUserSelectors.selectCurrentUser);
  const entryRequest = useSelector(entryRequestSelectors.selectFirstRequest);
  const [showRoundResult, setShowRoundResult] = useState(false);
  const votingKick = useSelector(votingKickSelectors.selectVotingKick);
  const [showVotingPopup, setShowVotingPopup] = useState(false);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    (async () => {
      if (currentIssue && currentUser.id === dealer.id) {
        await dispatch(
          thunks.startRoundThunk({
            dealerId: currentUser.id,
            issueId: currentIssue.id,
            gameId,
          })
        );
      }
    })();
  }, [currentIssue?.id]);

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

  useEffect(() => {
    if (votingKick.kickedPlayerId) {
      setShowVotingPopup(true);
    }
  }, [votingKick.kickedPlayerId]);

  const declineKickVote = async () => {
    const response = await dispatch(
      thunks.voteToKickThunk({
        votingPlayerId: currentUser.id,
        gameId,
        kickedPlayerId: votingKick.kickedPlayerId,
        accept: false,
      })
    );
    setShowVotingPopup(false);
    const payload = response.payload as Partial<IRequestResult>;
    if (payload.message) {
      dispatch(
        appActions.addOneInfoMessage(
          new InfoMessage(payload.message, TInfoMessageType.error).toObject()
        )
      );
      return;
    }
  };

  const acceptKickVote = async () => {
    const response = await dispatch(
      thunks.voteToKickThunk({
        votingPlayerId: currentUser.id,
        gameId,
        kickedPlayerId: votingKick.kickedPlayerId,
        accept: true,
      })
    );
    setShowVotingPopup(false);
    const payload = response.payload as Partial<IRequestResult>;
    if (payload.message) {
      dispatch(
        appActions.addOneInfoMessage(
          new InfoMessage(payload.message, TInfoMessageType.error).toObject()
        )
      );
      return;
    }
  };

  const admitEntryRequest = async () => {
    const response = await dispatch(thunks.admitPlayerThunk({ gameId }));
    dispatch(entryRequestsActions.popEntryRequest());
    const payload = response.payload as Partial<IRequestResult>;
    if (payload.message) {
      dispatch(
        appActions.addOneInfoMessage(
          new InfoMessage(payload.message, TInfoMessageType.error).toObject()
        )
      );
      return;
    }
  };

  const rejectEntryRequest = async () => {
    const response = await dispatch(thunks.rejectPlayerThunk({ gameId }));
    dispatch(entryRequestsActions.popEntryRequest());
    const payload = response.payload as Partial<IRequestResult>;
    if (payload.message) {
      dispatch(
        appActions.addOneInfoMessage(
          new InfoMessage(payload.message, TInfoMessageType.error).toObject()
        )
      );
      return;
    }
  };

  return (
    <div className={styles.container}>
      <BasePopup
        isShown={showVotingPopup}
        headingText="Kick player"
        buttonOkText="Yes"
        buttonCancelText="No"
        buttonOkProps={{ onClick: acceptKickVote }}
        buttonCancelProps={{ onClick: declineKickVote }}
      >
        <div className={styles.dealerKickPopup}>
          Kick
          <span className={styles.nameKickPlayer}>
            {User.getFullName(
              entryRequest.firstName as string,
              entryRequest.lastName
            )}
          </span>
          from the game?
        </div>
      </BasePopup>

      <BasePopup
        isShown={Boolean(entryRequest)}
        buttonOkText="Admit"
        buttonCancelText="Reject"
        buttonCancelProps={{
          onClick: rejectEntryRequest,
        }}
        buttonOkProps={{
          onClick: admitEntryRequest,
        }}
      >
        {`Admit ${User.getFullName(
          entryRequest.firstName as string,
          entryRequest.lastName
        )}?`}
      </BasePopup>
      {gameStatus !== TGameStatus.inactive && (
        <div
          className={`${styles.content} ${
            isSideBarShown ? styles.contentWithSidebar : ''
          }`}
        >
          <div className={styles.heading}>
            <SprintHeading issues={issues} />
          </div>
          <DealerSection dealer={dealer} />
          <div className={styles.controls}>
            <GameControls setIsGameFinished={setIsGameFinished} />
          </div>
          <div className={styles.main}>
            <div className={styles.issues}>
              <h4 className={styles.issuesHeading}>Issues</h4>
              <IssuesList />
            </div>
            {showRoundResult && currentIssue?.lastRoundResult && (
              <div className={styles.statistics}>
                <h4 className={styles.statisticsHeading}>Statistics</h4>
                <IssueStatistics issue={currentIssue} />
              </div>
            )}
          </div>
          <div className={styles.deck}>
            {((gameSettings.canScoreAfterFlip &&
              Object.keys(currentIssue?.lastRoundResult || {}).length > 0) ||
              (gameStatus === TGameStatus.roundInProgress &&
                !(
                  currentUser.role === TUserRole.dealer &&
                  !gameSettings.canDealerPlay
                ))) && <Deck />}
          </div>
        </div>
      )}
      {isSideBarShown && <SideBar />}
    </div>
  );
}
