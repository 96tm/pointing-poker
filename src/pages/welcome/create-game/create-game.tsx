import React from 'react';
import { BasePopup } from '../../shared/base-popup/base-popup';
import FormCreateGame from './form-create-game/form-create-game';

interface ICreateGameProps {
  isShown: boolean;
  handleCancelClick: () => void;
}

const CreateGame = ({
  handleCancelClick,
  isShown,
}: ICreateGameProps): JSX.Element => {
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
      <FormCreateGame onCancelClick={handleCancelClick} />
    </BasePopup>
  );
};

export default CreateGame;
