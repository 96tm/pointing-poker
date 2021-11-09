import React, { ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import { gameSettingsSelectors } from '../../../../../redux/selectors';
import { TCardScore, TCardType } from '../../../../../redux/types';
import styles from './popup-form.module.scss';

interface IPopupFormProps {
  newCardValues: TCardScore[];
  onChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void;
}

export default function PopupForm({
  newCardValues,
  onChange,
}: IPopupFormProps): JSX.Element {
  const { cardType } = useSelector(gameSettingsSelectors.selectSettings);

  return cardType !== TCardType.custom ? (
    <form>
      <label htmlFor="updateCard" className={styles.label}>
        <div className={styles.selectContainer}>
          <p>Select card value:</p>
          <select
            name="updateCard"
            className={styles.cardSelect}
            onChange={onChange}
          >
            {newCardValues.map((item) => {
              return <option key={item}>{item}</option>;
            })}
          </select>
        </div>
      </label>
    </form>
  ) : (
    <form>
      <label htmlFor="updateCard" className={styles.label}>
        <p>Select card value:</p>
        <input
          type="number"
          name="addCard"
          className={styles.cardSelect}
          onChange={onChange}
        ></input>
      </label>
    </form>
  );
}
