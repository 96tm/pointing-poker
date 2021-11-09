import React, { ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import { gameSettingsSelectors } from '../../../../../redux/selectors';
import { TCardScore, TCardScoreSpecialValue } from '../../../../../redux/types';
import { BasePopup } from '../../../base-popup/base-popup';
import { DECKS } from '../../constants';
import PopupForm from '../popup-form/popup-form';
import iconClose from '../../../../../shared/assets/icons/delete-cross.svg';
import styles from './popup-change-card.module.scss';

interface IPopupChangeCardProps {
  setNewValue: React.Dispatch<
    React.SetStateAction<number | TCardScoreSpecialValue>
  >;
  isShown: boolean;
  cardValues: TCardScore[];
  onClose(): void;
  onSubmit(): void;
  onDelete(): void;
}

export default function PopupChangeCard({
  isShown,
  onClose,
  onDelete,
  onSubmit,
  setNewValue,
  cardValues,
}: IPopupChangeCardProps): JSX.Element {
  const cardType = useSelector(gameSettingsSelectors.selectSettings).cardType;
  const deck = DECKS[cardType];
  const newCardValues = deck.filter((item) => !cardValues.includes(item));

  return (
    <BasePopup
      isShown={isShown}
      buttonCancelProps={{
        onClick: onDelete,
        className: styles.btnDelete,
      }}
      buttonOkProps={{ onClick: onSubmit }}
      buttonCancelText="Delete"
      buttonOkText="Add"
    >
      <img
        src={iconClose}
        alt="Close"
        title="Close"
        className={styles.iconClose}
        onClick={onClose}
      />
      <div className={styles.container}>
        <h4 className={styles.popupTitle}>Update Card</h4>
        <PopupForm
          newCardValues={newCardValues}
          onChange={(
            event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
          ) => setNewValue(+event.target.value)}
        />
      </div>
    </BasePopup>
  );
}
