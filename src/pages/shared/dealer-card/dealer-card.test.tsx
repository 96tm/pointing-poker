import { render } from '../../../shared/test-utils';
import React from 'react';
import DealerInfo from './dealer-card';
import { store } from '../../../redux/store';
import { TUserRole, User } from '../../../redux/types';

describe('Dealer info component', () => {
  const dealer = new User({
    firstName: 'dealerFirstName',
    role: TUserRole.dealer,
  });
  test('Should render component', () => {
    render(<DealerInfo dealer={dealer} />, {
      preloadedState: {
        ...store.getState(),
        currentUser: dealer,
      },
    });
  });
  test('Should render additional info if current user is dealer', () => {
    const { getByText } = render(<DealerInfo dealer={dealer} />, {
      preloadedState: {
        ...store.getState(),
        currentUser: dealer,
      },
    });
    getByText(/it\`s you/i);
  });
});
