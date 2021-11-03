import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { gameSelectors } from '../../../redux/selectors';
import { appActions } from '../../../redux/slices/app/app-slice';
import { entryRequestsActions } from '../../../redux/slices/entry-requests/entry-requests';
import { AppDispatch } from '../../../redux/store';
import { thunks } from '../../../redux/thunks/thunks';
import { IRequestResult, IUser, User } from '../../../redux/types';
import {
  InfoMessage,
  TInfoMessageType,
} from '../../../redux/types/info-message';
import { BasePopup } from '../../shared/base-popup/base-popup';

interface IEntryRequestProps {
  entryRequest: Partial<IUser> | undefined;
}

export default function EntryRequestPopup({
  entryRequest,
}: IEntryRequestProps): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const gameId = useSelector(gameSelectors.selectId);

  const admitEntryRequest = async () => {
    const response = await dispatch(thunks.admitPlayerThunk({ gameId }));
    dispatch(entryRequestsActions.popEntryRequest());
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

  const rejectEntryRequest = async () => {
    const response = await dispatch(thunks.rejectPlayerThunk({ gameId }));
    dispatch(entryRequestsActions.popEntryRequest());
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
    <BasePopup
      isShown={Boolean(entryRequest)}
      modal={true}
      buttonOkText="Admit"
      buttonCancelText="Reject"
      buttonOkProps={{ onClick: admitEntryRequest }}
      buttonCancelProps={{ onClick: rejectEntryRequest }}
    >
      {`Admit ${User.getFullName(
        entryRequest?.firstName as string,
        entryRequest?.lastName
      )}?`}
    </BasePopup>
  );
}
