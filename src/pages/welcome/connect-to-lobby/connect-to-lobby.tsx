import React from 'react';
import { BasePopup } from '../../shared/base-popup/base-popup';
import FormConnectToLobby from './components/form/form-connect-to-lobby';

interface IConnectToLobbyProps {
  gameId: string;
  isShown: boolean;
  handleCancelClick: () => void;
}

const ConnectToLobby = ({
  handleCancelClick,
  gameId,
  isShown,
}: IConnectToLobbyProps): JSX.Element => {
  return (
    <BasePopup
      isShown={isShown}
      buttonOkText="Confirm"
      buttonCancelText="Cancel"
      buttonCancelProps={{ onClick: handleCancelClick }}
      buttonOkProps={{
        form: 'textId',
        type: 'submit',
      }}
    >
      <FormConnectToLobby
        gameId={gameId}
        handleCancelClick={handleCancelClick}
      />
    </BasePopup>
  );
};

export default ConnectToLobby;
