import React from 'react';
import { render } from '../../../shared/test-utils';
import { InfoMessage as Message } from '../../../redux/types/info-message';
import InfoMessage from './info-message';

describe('InfoMessage component', () => {
  test('renders component', () => {
    const { getByText } = render(
      <InfoMessage message={new Message('message').toObject()} />
    );
    getByText(/message/i);
  });
});
