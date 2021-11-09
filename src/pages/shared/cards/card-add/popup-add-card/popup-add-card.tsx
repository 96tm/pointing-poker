import React, { ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import { gameSettingsSelectors } from '../../../../../redux/selectors';
import { TCardScore } from '../../../../../redux/types';
import { DECKS } from '../../constants';
import PopupForm from '../../card/popup-form/popup-form';
import styles from './popup-add-card.module.scss';

interface IPopupAddCardProps {
  setValues: React.Dispatch<React.SetStateAction<TCardScore[]>>;
  cardValues: TCardScore[];
}

export default function PopupAddCard({
  setValues,
  cardValues,
}: IPopupAddCardProps): JSX.Element {
  const { cardType } = useSelector(gameSettingsSelectors.selectSettings);
  const deck = DECKS[cardType];
  const newCardValues = deck.filter(
    (cardValue) => !cardValues.includes(cardValue)
  );

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const value = +event.target.value;
    setValues([...cardValues, value]);
  };

  return (
    <div className={styles.container}>
      <h4 className={styles.popupTitle}>Add Card</h4>
      <PopupForm onChange={handleChange} newCardValues={newCardValues} />
    </div>
  );
}
