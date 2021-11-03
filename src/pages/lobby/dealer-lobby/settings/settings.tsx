import React, { SyntheticEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { gameSettingsSelectors } from '../../../../redux/selectors';
import { gameSettingsActions } from '../../../../redux/slices/game-settings/game-settings-slice';
import { TCardType } from '../../../../redux/types';
import { APP_CONSTANTS } from '../../../../shared/constants';
import { DECKS } from '../../../shared/cards/constants';
import DeckSetting from './deck-setting/deck-setting';
import ScoreSetting from './score-setting.tsx/score-setting';
import TimerSetting from './timer-setting/timer-setting';
import BooleanSettings from './boolean-settings/boolean-settings';
import styles from './settings.module.scss';

export default function GameSettings(): JSX.Element {
  const dispatch = useDispatch();
  const { timer, cardType } = useSelector(gameSettingsSelectors.selectSettings);

  const handleChangeCardType = (event: SyntheticEvent) => {
    const value = (event.target as HTMLSelectElement).value as TCardType;
    dispatch(
      gameSettingsActions.changeSettings({
        cardType: value,
        cardValues: DECKS[value].slice(0, APP_CONSTANTS.DECK_SIZE),
      })
    );
  };
  return (
    <div className={styles.settingsList}>
      <BooleanSettings />
      {timer && <TimerSetting timer={timer} />}
      <ScoreSetting
        cardType={cardType}
        handleChangeCardType={handleChangeCardType}
      />
      <DeckSetting />
    </div>
  );
}
