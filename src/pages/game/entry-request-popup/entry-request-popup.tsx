import React, { ButtonHTMLAttributes } from 'react';
import { IUser, User } from '../../../redux/types';
import { BasePopup } from '../../shared/base-popup/base-popup';

interface IEntryRequestProps {
  entryRequest: Partial<IUser> | undefined;
  buttonOkProps: ButtonHTMLAttributes<HTMLButtonElement>;
  buttonCancelProps: ButtonHTMLAttributes<HTMLButtonElement>;
}

export default function EntryRequestPopup({
  entryRequest,
  buttonOkProps,
  buttonCancelProps,
}: IEntryRequestProps): JSX.Element {
  return (
    <BasePopup
      isShown={Boolean(entryRequest)}
      modal={true}
      buttonOkText="Admit"
      buttonCancelText="Reject"
      buttonCancelProps={buttonCancelProps}
      buttonOkProps={buttonOkProps}
    >
      {`Admit ${User.getFullName(
        entryRequest?.firstName as string,
        entryRequest?.lastName
      )}?`}
    </BasePopup>
  );
}
