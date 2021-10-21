import React, { ButtonHTMLAttributes } from 'react';
import { useSelector } from 'react-redux';
import { gameSelectors } from '../../../redux/selectors';
import { User } from '../../../redux/types';
import { IVotingKick } from '../../../redux/types/voting-kick';
import { BasePopup } from '../../shared/base-popup/base-popup';
import styles from './voting-popup.module.scss';

interface IVotingPopupProps {
  isShown: boolean;
  buttonOkProps: ButtonHTMLAttributes<HTMLButtonElement>;
  buttonCancelProps: ButtonHTMLAttributes<HTMLButtonElement>;
  votingKick: IVotingKick;
}

export default function VotingPopup({
  isShown,
  buttonOkProps,
  buttonCancelProps,
  votingKick,
}: IVotingPopupProps): JSX.Element {
  const playerToKick = useSelector(gameSelectors.selectPlayers).find(
    (player) => player.id === votingKick.kickedPlayerId
  );
  return (
    <BasePopup
      isShown={isShown}
      modal={true}
      headingText="Kick player"
      buttonOkText="Yes"
      buttonCancelText="No"
      buttonOkProps={buttonOkProps}
      buttonCancelProps={buttonCancelProps}
    >
      <div className={styles.dealerKickPopup}>
        Kick
        <span className={styles.nameKickPlayer}>
          {User.getFullName(
            playerToKick?.firstName as string,
            playerToKick?.lastName
          )}
        </span>
        from the game?
      </div>
    </BasePopup>
  );
}
