import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { currentUserSelectors, gameSelectors } from '../../../redux/selectors';
import { appActions } from '../../../redux/slices/app/app-slice';
import { AppDispatch } from '../../../redux/store';
import { thunks } from '../../../redux/thunks/thunks';
import {
  IIssue,
  IRequestResult,
  IUser,
  TGameStatus,
  TUserRole,
} from '../../../redux/types';
import {
  InfoMessage,
  TInfoMessageType,
} from '../../../redux/types/info-message';
import EditIssuePopup from '../edit-issue-popup/edit-issue-popup';
import IssueInfo from './issue-info/issue-info';
import IssueControls from './issue-controls/issue-controls';
import IssueInfoPopover from './issue-info-popover/issue-info-popover';
import IssueScoreForm from './issue-score-form/issue-score-form';
import styles from './issue-card.module.scss';

export interface IIssueCardProps {
  issue: IIssue;
  canEditScore: boolean;
  canRemove: boolean;
  customClass?: string;
}

export default function IssueCard({
  issue,
  canEditScore,
  canRemove,
  customClass,
}: IIssueCardProps): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const gameId = useSelector(gameSelectors.selectId);
  const gameStatus = useSelector(gameSelectors.selectStatus);
  const currentUser = useSelector(currentUserSelectors.selectCurrentUser);
  const currentIssueId = useSelector(gameSelectors.selectCurrentIssueId);
  const dealer = useSelector(gameSelectors.selectDealer) as IUser;
  const isCurrentIssue = issue.id === currentIssueId;
  const [isPopoverShown, setIsPopoverShown] = useState(false);
  const [isUpdateFormShown, setIsUpdateFormShown] = useState(false);
  const [warning, setWarning] = useState('');
  const [issueFields, setIssueFields] = useState(issue);

  const handleClick = async () => {
    if (
      currentUser.role === TUserRole.dealer &&
      !isCurrentIssue &&
      gameStatus === TGameStatus.started
    ) {
      const response = await dispatch(
        thunks.changeCurrentIssueThunk({
          dealerId: currentUser.id,
          gameId,
          issueId: issue.id,
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
    }
  };

  const handleUpdateIssue = async () => {
    const response = await dispatch(
      thunks.updateIssueThunk({
        dealerId: dealer.id,
        updatedIssue: issueFields,
        gameId,
      })
    );
    setIsUpdateFormShown(false);
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

  const handleSubmitIssue = () => {
    if (issueFields.link !== '' && issueFields.title !== '') {
      handleUpdateIssue();
    } else {
      setWarning('*fields in the form cannot be empty');
    }
  };

  return (
    <div
      className={`${styles.issueCard} ${isCurrentIssue ? styles.current : ''} ${
        customClass || ''
      }`}
      onClick={handleClick}
    >
      <IssueInfo
        issue={issue}
        isCurrentIssue={isCurrentIssue}
        setIsPopoverShown={setIsPopoverShown}
      />
      {[TGameStatus.started, TGameStatus.roundInProgress].includes(
        gameStatus
      ) && <IssueScoreForm issue={issue} canEditScore={canEditScore} />}
      {gameStatus !== TGameStatus.inactive && (
        <IssueControls
          issue={issue}
          issueFields={issueFields}
          canRemove={canRemove}
          setIsUpdateFormShown={setIsUpdateFormShown}
        />
      )}
      {isPopoverShown && (
        <IssueInfoPopover issue={issue} setIsPopoverShown={setIsPopoverShown} />
      )}
      <EditIssuePopup
        info={issueFields}
        setIssueFields={setIssueFields}
        warning={warning}
        isShown={isUpdateFormShown}
        buttonCancelProps={{ onClick: () => setIsUpdateFormShown(false) }}
        buttonOkProps={{ onClick: handleSubmitIssue }}
      />
    </div>
  );
}
