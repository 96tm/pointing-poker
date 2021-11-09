import styles from '../settings.module.scss';
import React from 'react';
import Deck from '../../../../shared/cards/deck';

export default function DeckSetting(): JSX.Element {
  return (
    <div className={styles.settingsCard}>
      <h5 className={styles.setting}>Add card values:</h5>
      <div className={styles.playCards}>
        <Deck />
      </div>
    </div>
  );
}
