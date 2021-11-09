import { entryRequestsActions } from '../../../../redux/slices/entry-requests/entry-requests';
import { store } from '../../../../redux/store';
import { User } from '../../../../redux/types';
import { IEntryRequestResponseWS } from '../../types';

export default function entryRequested({
  playerId,
  firstName,
  lastName,
  role,
  jobPosition,
}: IEntryRequestResponseWS): void {
  store.dispatch(
    entryRequestsActions.pushEntryRequest(
      new User({
        id: playerId,
        firstName,
        lastName,
        role,
        jobPosition,
      }).toObject()
    )
  );
}
