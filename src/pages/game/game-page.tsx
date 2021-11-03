import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  currentUserSelectors,
  gamePageSelectors,
  gameSelectors,
  gameSettingsSelectors,
  votingKickSelectors,
} from '../../redux/selectors';
import { entryRequestSelectors } from '../../redux/selectors/entry-request-selectors';
import { AppDispatch } from '../../redux/store';
import { thunks } from '../../redux/thunks/thunks';
import { IUser, TGameStatus, TUserRole } from '../../redux/types';
import Deck from '../shared/cards/deck';
import DealerSection from '../shared/dealer-section/dealer-section';
import Sidebar from '../shared/sidebar/sidebar';
import SprintHeading from '../shared/sprint-heading/sprint-heading';
import EntryRequestPopup from './entry-request-popup/entry-request-popup';
import GameControls from './game-controls/game-controls';
import IssuesList from './issues-list/issues-list';
import IssueStatistics from './statistics/issue-statistics';
import VotingPopup from './voting-popup/voting-popup';
import useRoutingEffect from './hooks/useRoutingEffect';
import styles from './game-page.module.scss';

export function GamePage(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const [isGameFinished, setIsGameFinished] = useState(false);
  const isSidebarShown = useSelector(gamePageSelectors.selectIsSidebarShown);
  const gameStatus = useSelector(gameSelectors.selectStatus);
  const gameId = useSelector(gameSelectors.selectId);
  const issues = useSelector(gameSelectors.selectIssues);
  const dealer = useSelector(gameSelectors.selectDealer) as IUser;
  const currentIssue = useSelector(gameSelectors.selectCurrentIssue);
  const firstRender = useRef<boolean>(true);
  const gameSettings = useSelector(gameSettingsSelectors.selectSettings);
  const currentUser = useSelector(currentUserSelectors.selectCurrentUser);
  const entryRequest = useSelector(entryRequestSelectors.selectFirstRequest);
  const [showRoundResult, setShowRoundResult] = useState(false);
  const votingKick = useSelector(votingKickSelectors.selectVotingKick);
  const [isVotingPopupShown, setIsVotingPopupShown] = useState(false);

  useRoutingEffect(isGameFinished, setShowRoundResult);

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
    if (votingKick.kickedPlayerId) {
      setIsVotingPopupShown(true);
    }
  }, [votingKick.kickedPlayerId]);

  return (
    <div className={styles.container}>
      <VotingPopup
        isShown={isVotingPopupShown}
        setIsVotingPopupShown={setIsVotingPopupShown}
        votingKick={votingKick}
      />
      <EntryRequestPopup entryRequest={entryRequest} />
      {gameStatus !== TGameStatus.inactive && (
        <div
          className={`${styles.content} ${
            isSidebarShown ? styles.contentWithSidebar : ''
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
      {isSidebarShown && <Sidebar />}
    </div>
  );
}
