import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { gameSettingsSelectors } from '../../../../../redux/selectors';
import { gameSettingsActions } from '../../../../../redux/slices/game-settings/game-settings-slice';
import CustomSetting from '../custom-setting/custom-setting';

export default function BooleanSettings(): JSX.Element {
  const dispatch = useDispatch();
  const { canDealerPlay, autoAdmit, autoFlipCards, canScoreAfterFlip, timer } =
    useSelector(gameSettingsSelectors.selectSettings);

  const handleChangeCanDealerPlay = () =>
    dispatch(
      gameSettingsActions.changeSettings({
        canDealerPlay: !canDealerPlay,
      })
    );

  const handleChangeCanScoreAfterFlip = () =>
    dispatch(
      gameSettingsActions.changeSettings({
        canScoreAfterFlip: !canScoreAfterFlip,
      })
    );

  const handleChangeAutoFlip = () =>
    dispatch(
      gameSettingsActions.changeSettings({
        autoFlipCards: !autoFlipCards,
      })
    );

  const handleChangeAutoAdmit = () =>
    dispatch(gameSettingsActions.changeSettings({ autoAdmit: !autoAdmit }));

  const handleChangeTimer = () => {
    if (timer) {
      dispatch(
        gameSettingsActions.changeSettings({
          timer: undefined,
        })
      );
    } else {
      dispatch(
        gameSettingsActions.changeSettings({
          timer: { minutes: 2, seconds: 30 },
        })
      );
    }
  };

  return (
    <>
      {[
        {
          inputLabel: 'Scram master as player:',
          inputId: 'can-dealer-play',
          handleChange: handleChangeCanDealerPlay,
        },
        {
          inputLabel: 'Changing card in round end:',
          inputId: 'can-score-after-flip',
          handleChange: handleChangeCanScoreAfterFlip,
        },
        {
          inputLabel: 'Automatically admit all new members:',
          inputId: 'auto-admit',
          handleChange: handleChangeAutoAdmit,
        },
        {
          inputLabel: 'Automatic flip of cards:',
          inputId: 'auto-flip',
          handleChange: handleChangeAutoFlip,
        },
        {
          inputLabel: 'Set timer:',
          inputId: 'is-timer-set',
          handleChange: handleChangeTimer,
        },
      ].map((setting) => (
        <CustomSetting
          key={setting.inputId}
          inputLabel={setting.inputLabel}
          inputId={setting.inputId}
          onChange={setting.handleChange}
        />
      ))}
    </>
  );
}
