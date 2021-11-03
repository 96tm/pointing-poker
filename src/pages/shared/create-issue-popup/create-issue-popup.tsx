import React from 'react';
import { BasePopup, IBasePopupProps } from '../base-popup/base-popup';
import CreateIssueForm, {
  ICreateIssueFormProps,
} from './create-issue-form/create-issue-form';

interface ICreateIssuePopup extends IBasePopupProps, ICreateIssueFormProps {
  handleClose(): void;
  handleSubmit(): void;
}

export function CreateIssuePopup({
  handleClose,
  handleSubmit,
  setIssueFields,
  info,
  warning,
  isShown,
}: ICreateIssuePopup): JSX.Element {
  return (
    <BasePopup
      isShown={isShown}
      buttonCancelProps={{ onClick: handleClose }}
      buttonOkProps={{ onClick: handleSubmit }}
      buttonCancelText="Cancel"
      buttonOkText="Create"
    >
      <CreateIssueForm
        info={info}
        setIssueFields={setIssueFields}
        warning={warning}
      />
    </BasePopup>
  );
}
