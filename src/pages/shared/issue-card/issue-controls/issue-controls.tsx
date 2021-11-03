import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  currentUserSelectors,
  gameSelectors,
} from '../../../../redux/selectors';
import {
  IIssue,
  IRequestResult,
  IUser,
  TGameStatus,
} from '../../../../redux/types';
import iconDeleteIssue from '../../../../shared/assets/icons/deleteIssue.png';
import iconEditIssue from '../../../../shared/assets/icons/edit-issue.svg';
import { AppDispatch } from '../../../../redux/store';
import { thunks } from '../../../../redux/thunks/thunks';
import { appActions } from '../../../../redux/slices/app/app-slice';
import {
  InfoMessage,
  TInfoMessageType,
} from '../../../../redux/types/info-message';
import ButtonClose from '../../buttons/button-close/button-close';
import styles from './issue-controls.module.scss';

interface IIssueControlsProps {
  issue: IIssue;
  issueFields: IIssue;
  canRemove: boolean;
  setIsUpdateFormShown: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function IssueControls({
  issue,
  issueFields,
  canRemove,
  setIsUpdateFormShown,
}: IIssueControlsProps): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const gameId = useSelector(gameSelectors.selectId);
  const gameStatus = useSelector(gameSelectors.selectStatus);
  const currentUser = useSelector(currentUserSelectors.selectCurrentUser);
  const dealer = useSelector(gameSelectors.selectDealer) as IUser;
  const isDealer = currentUser.id === dealer.id;

  const handleDeleteIssue = async () => {
    await dispatch(
      thunks.deleteIssueThunk({
        dealerId: dealer.id,
        deletedIssueId: issueFields.id,
        gameId,
      })
    );
  };

  const deleteIssue = async () => {
    const response = await dispatch(
      thunks.deleteIssueThunk({
        dealerId: currentUser.id,
        deletedIssueId: issue.id,
        gameId,
      })
    );
    const payload = response.payload as Partial<IRequestResult>;
    if (payload.message) {
      dispatch(
        appActions.addOneInfoMessage(
          new InfoMessage(payload.message, TInfoMessageType.error).toObject()
        )
      );
      return;
    }
  };

  return (
    <div className={styles.container}>
      {isDealer && gameStatus === TGameStatus.lobby && (
        <div className={styles.lobbyControls}>
          <img
            src={iconEditIssue}
            className={styles.iconEdit}
            onClick={() => setIsUpdateFormShown(true)}
          ></img>
          <img
            src={iconDeleteIssue}
            className={styles.iconDelete}
            onClick={handleDeleteIssue}
          ></img>
        </div>
      )}
      {isDealer && canRemove && gameStatus === TGameStatus.started && (
        <div className={styles.buttonCloseContainer}>
          <ButtonClose onClick={deleteIssue} title="Delete issue" />
        </div>
      )}
    </div>
  );
}
