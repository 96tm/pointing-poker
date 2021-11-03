import React from 'react';
import { fireEvent, render } from '../../../shared/test-utils';
import { BasePopup } from './base-popup';

describe('Base pop-up', () => {
  test('renders empty popup', () => {
    render(<BasePopup isShown={true} />);
  });

  test('renders popup with heading, content and both buttons', () => {
    const handleButtonOk = jest.fn();
    const handleButtonCancel = jest.fn();
    const { getByText } = render(
      <BasePopup
        isShown={true}
        headingText="heading"
        buttonOkText="buttonOk"
        buttonCancelText="buttonCancel"
        buttonOkProps={{ onClick: handleButtonOk }}
        buttonCancelProps={{ onClick: handleButtonCancel }}
      >
        Content
      </BasePopup>
    );
    getByText(/heading/i);
    getByText(/content/i);
    const buttonOk = getByText(/buttonOk/i);
    const buttonCancel = getByText(/buttonCancel/i);
    fireEvent.click(buttonOk);
    expect(handleButtonOk).toBeCalledTimes(1);
    fireEvent.click(buttonCancel);
    expect(handleButtonCancel).toBeCalledTimes(1);
  });
});
