import React from 'react';
import { render } from '../../../shared/test-utils';
import { InfoMessage } from '../../../redux/types/info-message';
import InfoMessageList from './info-message-list';

describe('InfoMessageList component', () => {
  test('renders component', () => {
    const { getByText } = render(<InfoMessageList />, {
      preloadedState: {
        app: {
          isConnected: false,
          infoMessages: [
            new InfoMessage('message1'),
            new InfoMessage('message2'),
          ],
          socketId: '',
        },
      },
    });
    getByText(/message1/i);
    getByText(/message2/i);
  });
});
