import React from 'react';
import { BasePopup } from '../../shared/base-popup/base-popup';
import FormCreateGame from './form-create-game/form-create-game';

interface ICreateGameProps {
  isShown: boolean;
  isMounted?: boolean;
  onCancel(): void;
}

const CreateGame = ({ isShown, onCancel }: ICreateGameProps): JSX.Element => {
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
      <FormCreateGame onCancelClick={onCancel} />
    </BasePopup>
  );
};

export default CreateGame;
