import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  gameSelectors,
  gameSettingsSelectors,
} from '../../../../redux/selectors';
import { gameSettingsActions } from '../../../../redux/slices/game-settings/game-settings-slice';
import {
  TCardScore,
  TCardScoreSpecialValue,
} from '../../../../redux/types/card';
import { TGameStatus } from '../../../../redux/types';
import PopupChangeCard from './popup-change-card/popup-change-card';
import editCard from '../../../../shared/assets/icons/edit-issue.svg';
import breakImage from '../../../../shared/assets/icons/break.svg';
import styles from './card.module.scss';

interface IPlayCardProps {
  mode: string;
  cardValue: TCardScore;
  isSelected: boolean;
  onClick(): void;
  customClass?: string;
}

export default function PlayCard({
  mode,
  cardValue,
  isSelected,
  onClick,
  customClass,
}: React.PropsWithChildren<IPlayCardProps>): JSX.Element {
  const dispatch = useDispatch();
  const { cardValues } = useSelector(gameSettingsSelectors.selectSettings);
  const gameStatus = useSelector(gameSelectors.selectGame).status;
  const [newValue, setNewValue] = useState(cardValue);
  const [isUpdatePopupShown, setIsUpdatePopupShown] = useState(false);

  const handleClose = () => {
    setIsUpdatePopupShown(false);
    setNewValue(cardValue);
  };

  const handleDelete = () => {
    dispatch(
      gameSettingsActions.changeSettings({
        cardValues: cardValues.filter((item) => item !== newValue),
      })
    );
    handleClose();
  };

  const handleSubmit = () => {
    dispatch(
      gameSettingsActions.changeSettings({
        cardValues: cardValues.map((item) =>
          item === cardValue ? newValue : item
        ),
      })
    );
    handleClose();
  };

  return (
    <>
      <section
        className={`${styles.playCard} ${customClass || ''}`}
        data-rank={newValue}
        data-mode={mode}
        onClick={onClick}
      >
        {gameStatus === TGameStatus.lobby && typeof newValue === 'number' && (
          <img
            src={editCard}
            className={styles.iconEdit}
            onClick={() => setIsUpdatePopupShown(true)}
          ></img>
        )}

        {isSelected && gameStatus !== TGameStatus.lobby && (
          <div className={styles.chosenCardBackground} />
        )}
        <div className={styles.top}>
          {newValue === TCardScoreSpecialValue.break ? (
            <img src={breakImage} alt="Break" width="75%" />
          ) : newValue === TCardScoreSpecialValue.unknown ? (
            '?'
          ) : (
            newValue
          )}
        </div>
        <div className={styles.center}>
          {newValue === TCardScoreSpecialValue.break ? (
            <img src={breakImage} alt="Break" width="75%" />
          ) : newValue === TCardScoreSpecialValue.unknown ? (
            '?'
          ) : (
            newValue
          )}
        </div>
        <div className={styles.bottom}>
          {newValue === TCardScoreSpecialValue.break ? (
            <img src={breakImage} alt="Break" width="75%" />
          ) : newValue === TCardScoreSpecialValue.unknown ? (
            '?'
          ) : (
            newValue
          )}
        </div>
      </section>
      <PopupChangeCard
        isShown={isUpdatePopupShown}
        setNewValue={setNewValue}
        onClose={handleClose}
        onDelete={handleDelete}
        onSubmit={handleSubmit}
        cardValues={cardValues}
      />
    </>
  );
}
