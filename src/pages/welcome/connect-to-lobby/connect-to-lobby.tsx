import React from 'react';
import { BasePopup } from '../../shared/base-popup/base-popup';
import FormConnectToLobby from './components/form/form-connect-to-lobby';

interface IConnectToLobbyProps {
  gameId: string;
  isShown: boolean;
  onCancel: () => void;
}

function ConnectToLobby({
  onCancel,
  gameId,
  isShown,
}: IConnectToLobbyProps): JSX.Element {
  return (
    <BasePopup
      isShown={isShown}
      buttonOkText="Confirm"
      buttonCancelText="Cancel"
      buttonCancelProps={{ onClick: onCancel }}
      buttonOkProps={{
        form: 'textId',
        type: 'submit',
      }}
    >
      <FormConnectToLobby gameId={gameId} onCancel={onCancel} />
    </BasePopup>
  );
}

export default ConnectToLobby;
