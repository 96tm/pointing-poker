import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { gameSettingsSelectors } from '../../../../redux/selectors';
import { gameSettingsActions } from '../../../../redux/slices/game-settings/game-settings-slice';
import { BasePopup } from '../../base-popup/base-popup';
import PopupAddCard from './popup-add-card/popup-add-card';
import styles from '../card/card.module.scss';

export default function CardAdd(): JSX.Element {
  const dispatch = useDispatch();
  const { cardValues } = useSelector(gameSettingsSelectors.selectSettings);
  const [isPopupShown, setIsPopupShown] = useState(false);
  const [values, setValues] = useState(cardValues);
  const handleClose = () => {
    setIsPopupShown(false);
  };

  const handleShowEdit = () => {
    setIsPopupShown(true);
  };

  const handleSubmit = () => {
    dispatch(
      gameSettingsActions.changeSettings({
        cardValues: values,
      })
    );
    handleClose();
  };

  return (
    <>
      <div className={styles.playCard}>
        <span className={styles.btnAddCard} onClick={handleShowEdit}>
          +
        </span>
      </div>
      <BasePopup
        isShown={isPopupShown}
        buttonCancelProps={{ onClick: handleClose }}
        buttonOkProps={{ onClick: handleSubmit }}
        buttonCancelText="Cancel"
        buttonOkText="Add"
      >
        <PopupAddCard setValues={setValues} cardValues={cardValues} />
      </BasePopup>
    </>
  );
}
