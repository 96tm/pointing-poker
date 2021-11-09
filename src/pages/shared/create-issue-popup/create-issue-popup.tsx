import React from 'react';
import { BasePopup, IBasePopupProps } from '../base-popup/base-popup';
import CreateIssueForm, {
  ICreateIssueFormProps,
} from './create-issue-form/create-issue-form';

interface ICreateIssuePopup extends IBasePopupProps, ICreateIssueFormProps {
  onClose(): void;
  onSubmit(): void;
}

export function CreateIssuePopup({
  onClose,
  onSubmit,
  setIssueFields,
  info,
  warning,
  isShown,
}: ICreateIssuePopup): JSX.Element {
  return (
    <BasePopup
      isShown={isShown}
      buttonCancelProps={{ onClick: onClose }}
      buttonOkProps={{ onClick: onSubmit }}
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
