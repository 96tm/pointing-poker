import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { gameSettingsSelectors } from '../../../redux/selectors';
import { gameSettingsActions } from '../../../redux/slices/game-settings/game-settings-slice';
import { BasePopup } from '../base-popup/base-popup';
import styles from './card.module.scss';
import PopupAddCard from './popup-add-card/popup-add-card';

const CardAdd = (): JSX.Element => {
  const dispatch = useDispatch();
  const { cardValues } = useSelector(gameSettingsSelectors.selectSettings);
  const [showEdit, setShowEdit] = useState(false);
  const [values, setValues] = useState(cardValues);
  const handleClose = () => {
    setShowEdit(false);
  };

  const handleShowEdit = () => {
    setShowEdit(true);
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
        isShown={showEdit}
        buttonCancelProps={{ onClick: handleClose }}
        buttonOkProps={{ onClick: handleSubmit }}
        buttonCancelText="No"
        buttonOkText="Yes"
      >
        <PopupAddCard setValues={setValues} cardValues={cardValues} />
      </BasePopup>
    </>
  );
};

export default CardAdd;
