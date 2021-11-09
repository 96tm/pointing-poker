import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  currentUserSelectors,
  gameSelectors,
  gameSettingsSelectors,
} from '../../../redux/selectors';
import { appActions } from '../../../redux/slices/app/app-slice';
import { AppDispatch } from '../../../redux/store';
import { scoreIssueThunk } from '../../../redux/thunks';
import { IRequestResult, TGameStatus } from '../../../redux/types';
import { TCardScore } from '../../../redux/types/card';
import {
  InfoMessage,
  TInfoMessageType,
} from '../../../redux/types/info-message';
import PlayCard from './card/card';
import CardAdd from './card-add/card-add';
import styles from './deck.module.scss';

export default function Deck(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedCard, setSelectedCard] = useState<TCardScore>(-1);
  const gameSettings = useSelector(gameSettingsSelectors.selectSettings);
  const { cardValues } = useSelector(gameSettingsSelectors.selectSettings);
  const gameId = useSelector(gameSelectors.selectId);
  const currentIssueId = useSelector(gameSelectors.selectCurrentIssueId);
  const currentUser = useSelector(currentUserSelectors.selectCurrentUser);
  const gameStatus = useSelector(gameSelectors.selectStatus);

  async function handleClick(cardValue: TCardScore) {
    if (
      gameStatus === TGameStatus.roundInProgress ||
      (gameStatus === TGameStatus.started && gameSettings.canScoreAfterFlip)
    ) {
      setSelectedCard(cardValue);
      const response = await dispatch(
        scoreIssueThunk({
          issueId: currentIssueId,
          playerId: currentUser.id,
          score: cardValue,
          gameId,
        })
      );
      const payload = response.payload as Partial<IRequestResult>;
      if (payload.message) {
        dispatch(
          appActions.addOneInfoMessage(
            new InfoMessage(payload.message, TInfoMessageType.error).toObject()
          )
        );
        return;
      }
    }
  }

  return (
    <>
      <div className={styles.deck}>
        {cardValues.map((cardValue, i) =>
          i === 0 ? (
            <PlayCard
              key={cardValue}
              cardValue={cardValue}
              mode="single"
              isSelected={selectedCard === cardValue}
              onClick={() => handleClick(cardValue)}
            />
          ) : (
            <PlayCard
              key={cardValue}
              cardValue={cardValue}
              mode="deck"
              isSelected={selectedCard === cardValue}
              onClick={() => handleClick(cardValue)}
            />
          )
        )}
        {gameStatus === TGameStatus.lobby && <CardAdd />}
      </div>
    </>
  );
}
