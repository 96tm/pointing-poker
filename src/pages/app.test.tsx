import React from 'react';
import { render } from '../shared/test-utils';
import App from './app';
import { Game } from '../redux/types';

describe('App component', () => {
  test('renders component', () => {
    render(<App />);
  });
  test('renders component with custom route', () => {
    render(<App />, {
      route: '/',
    });
  });
  test('renders component with custom state', () => {
    render(<App />, {
      preloadedState: { game: new Game({ id: '12341' }) },
    });
  });
});
