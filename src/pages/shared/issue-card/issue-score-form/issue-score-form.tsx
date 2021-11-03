import React, { FormEvent, SyntheticEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../../redux/store';
import { thunks } from '../../../../redux/thunks/thunks';
import {
  currentUserSelectors,
  gameSelectors,
} from '../../../../redux/selectors';
import { IIssue, IRequestResult } from '../../../../redux/types';
import { appActions } from '../../../../redux/slices/app/app-slice';
import {
  InfoMessage,
  TInfoMessageType,
} from '../../../../redux/types/info-message';
import styles from './issue-score-form.module.scss';

interface IIssueScoreFormProps {
  issue: IIssue;
  canEditScore: boolean;
}

export default function IssueScoreForm({
  issue,
  canEditScore,
}: IIssueScoreFormProps): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const currentUser = useSelector(currentUserSelectors.selectCurrentUser);
  const gameId = useSelector(gameSelectors.selectId);
  const [isScoreInputShown, setIsScoreInputShown] = useState(false);

  const handleScoreInputChange = async (newValue: string) => {
    const numberValue = Number(newValue);
    if (numberValue && numberValue > 0) {
      const response = await dispatch(
        thunks.updateIssueThunk({
          dealerId: currentUser.id,
          gameId,
          updatedIssue: {
            ...issue,
            score: numberValue,
          },
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
    setIsScoreInputShown(false);
  };

  const handleChange = async (event: SyntheticEvent<HTMLInputElement>) => {
    const input = event.target as HTMLInputElement;
    await handleScoreInputChange(input.value);
  };

  const handleSubmitScore = async (event: FormEvent) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      scoreInput: { value: string };
    };
    await handleScoreInputChange(target.scoreInput.value);
  };

  const getIssueScore = (): string => {
    return Object.keys(issue.lastRoundResult).length
      ? String(issue.score)
      : '\u2015';
  };

  return !isScoreInputShown ? (
    <span
      onClick={canEditScore ? () => setIsScoreInputShown(true) : undefined}
      className={styles.score}
    >
      {getIssueScore()}
    </span>
  ) : (
    <form onSubmit={handleSubmitScore}>
      <input
        type="text"
        name="scoreInput"
        maxLength={2}
        autoFocus
        onBlur={handleChange}
        className={styles.score}
      />
    </form>
  );
}
