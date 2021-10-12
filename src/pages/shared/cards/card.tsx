import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { gameSelectors, gameSettingsSelectors } from '../../../redux/selectors';
import { gameSettingsActions } from '../../../redux/slices/game-settings/game-settings-slice';
import { TCardScore } from '../../../redux/types/card';
import { BasePopup } from '../base-popup/base-popup';
import PopupChangeCard from './popup-change-card/popup-change-card';
import editCard from '../../../shared/assets/icons/edit-issue.svg';
import breakImage from '../../../shared/assets/icons/break.svg';
import styles from './card.module.scss';
import { TGameStatus } from '../../../redux/types';
import close from '../../../shared/assets/icons/close.png';
interface IPlayCardProps {
  mode: string;
  cardValue: TCardScore;
  isSelected: boolean;
  customClass?: string;
  handleClick(): void;
}

export default function PlayCard({
  cardValue,
  mode,
  isSelected,
  customClass,
  handleClick,
}: React.PropsWithChildren<IPlayCardProps>): JSX.Element {
  const dispatch = useDispatch();
  const { cardValues } = useSelector(gameSettingsSelectors.selectSettings);
  const [value, setValue] = useState(cardValue);
  const gameStatus = useSelector(gameSelectors.selectGame).status;
  const [showEdit, setShowEdit] = useState(false);

  const handleClose = () => {
    setShowEdit(false);
    setValue(cardValue);
  };

  const handleShowEdit = () => {
    setShowEdit(true);
  };

  const handleDelete = () => {
    dispatch(
      gameSettingsActions.changeSettings({
        cardValues: cardValues.filter((el) => el !== value),
      })
    );
    handleClose();
  };

  const handleSubmit = () => {
    dispatch(
      gameSettingsActions.changeSettings({
        cardValues: cardValues.map(function (item) {
          return item === cardValue ? value : item;
        }),
      })
    );
    handleClose();
  };

  return (
    <>
      <section
        className={`${styles.playCard} ${customClass || ''}`}
        data-rank={value}
        data-mode={mode}
        onClick={handleClick}
      >
        {gameStatus === TGameStatus.lobby && typeof value === 'number' && (
          <img
            src={editCard}
            className={styles.iconEdit}
            onClick={handleShowEdit}
          ></img>
        )}

        {isSelected && gameStatus !== 'lobby' && (
          <div className={styles.chosenCardBackground} />
        )}
        <div className={styles.top}>
          {value === 'break' ? (
            <img src={breakImage} alt="Break" width="75%" />
          ) : value === 'unknown' ? (
            '?'
          ) : (
            value
          )}
        </div>
        <div className={styles.center}>
          {value === 'break' ? (
            <img src={breakImage} alt="Break" width="75%" />
          ) : value === 'unknown' ? (
            '?'
          ) : (
            value
          )}
        </div>
        <div className={styles.bottom}>
          {value === 'break' ? (
            <img src={breakImage} alt="Break" width="75%" />
          ) : value === 'unknown' ? (
            '?'
          ) : (
            value
          )}
        </div>
      </section>

      <BasePopup
        isShown={showEdit}
        buttonCancelProps={{
          onClick: handleDelete,
          className: `${styles.btnDelete}`,
        }}
        buttonOkProps={{ onClick: handleSubmit }}
        buttonCancelText="Delete"
        buttonOkText="Add"
      >
        <img
          src={close}
          alt="close popup"
          className={styles.iconClose}
          onClick={handleClose}
        />
        <PopupChangeCard setValue={setValue} cardValues={cardValues} />
      </BasePopup>
    </>
  );
}
