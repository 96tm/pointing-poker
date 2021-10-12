import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  currentUserSelectors,
  gameSelectors,
} from '../../../../redux/selectors';
import { appActions } from '../../../../redux/slices/app/app-slice';
import { AppDispatch } from '../../../../redux/store';
import { thunks } from '../../../../redux/thunks/thunks';
import { IIssue, IRequestResult } from '../../../../redux/types';
import {
  InfoMessage,
  TInfoMessageType,
} from '../../../../redux/types/info-message';
import deleteIssue from '../../../../shared/assets/icons/deleteIssue.png';
import editIssue from '../../../../shared/assets/icons/edit-issue.svg';
import { BasePopup } from '../../../shared/base-popup/base-popup';
import PopupChangeIssue from './popupChangeIssue/popupChangeIssue';
import styles from './issue-card.module.scss';

export interface IPropsIssue {
  infoIssue: IIssue;
}

const IssueCard = ({ infoIssue }: IPropsIssue): JSX.Element => {
  const dealer = useSelector(currentUserSelectors.selectCurrentUser);
  const [showEdit, setShowEdit] = useState(false);
  const [issueFields, setIssueFields] = useState(infoIssue);
  const [warning, setWarning] = useState('');
  const gameId = useSelector(gameSelectors.selectId);
  const [isWithinIssueCard, setIsWithinIssueCard] = useState(false);
  const [isWithinIssueCardInfo, setIsWithinIssueCardInfo] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleClose = () => {
    setShowEdit(false);
  };

  const handleShowEdit = () => {
    setShowEdit(true);
  };

  const handleUpdateIssue = async () => {
    const response = await dispatch(
      thunks.updateIssueThunk({
        dealerId: dealer.id,
        updatedIssue: issueFields,
        gameId,
      })
    );
    handleClose();
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

  const handleSubmit = () => {
    if (issueFields.link !== '' && issueFields.title !== '') {
      handleUpdateIssue();
    } else {
      setWarning('*fields in the form cannot be empty');
    }
  };

  const handleDeleteIssue = async () => {
    await dispatch(
      thunks.deleteIssueThunk({
        dealerId: dealer.id,
        deletedIssueId: issueFields.id,
        gameId,
      })
    );
  };

  return (
    <>
      <div className={styles.main}>
        <div
          className={styles.name}
          onMouseEnter={() => {
            setIsWithinIssueCard(true);
            setIsWithinIssueCardInfo(true);
          }}
          onMouseLeave={() => {
            setIsWithinIssueCard(false);
          }}
        >
          {infoIssue.title}
        </div>
        <img
          src={editIssue}
          className={styles.iconEdit}
          onClick={handleShowEdit}
        ></img>
        <img
          src={deleteIssue}
          className={styles.iconDelete}
          onClick={handleDeleteIssue}
        ></img>
      </div>
      <div className={styles.priority}>Priority {infoIssue.priority}</div>

      <BasePopup
        isShown={showEdit}
        buttonCancelProps={{ onClick: handleClose }}
        buttonOkProps={{ onClick: handleSubmit }}
        buttonCancelText="No"
        buttonOkText="Yes"
        contentProps={{ className: `${styles.warning}` }}
      >
        <PopupChangeIssue
          info={issueFields}
          setIssueFields={setIssueFields}
          warning={warning}
        />
      </BasePopup>
      {(isWithinIssueCard || isWithinIssueCardInfo) && (
        <div
          className={styles.infoPopup}
          onMouseEnter={() => {
            setIsWithinIssueCardInfo(true);
          }}
          onMouseLeave={() => {
            setIsWithinIssueCardInfo(false);
          }}
        >
          <div className={styles.infoTitle}>
            <div className={styles.nameInfo}>Title:</div>
            <div className={styles.infoValue}>{infoIssue.title}</div>
          </div>
          <div className={styles.infoLink}>
            <div className={styles.nameInfo}>Link:</div>
            <div className={styles.infoValue}>
              <a href={infoIssue.link}>{infoIssue.link}</a>
            </div>
          </div>
          <div className={styles.infoPriority}>
            <div className={styles.nameInfo}>Priority:</div>
            <div className={styles.infoValue}>{infoIssue.priority}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default IssueCard;
