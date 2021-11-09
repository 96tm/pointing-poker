import React from 'react';
import { render } from '../../shared/test-utils';
import WelcomePage from './welcome';

describe('WelcomePage component', () => {
  test('renders component', () => {
    const { getByText, getByTestId } = render(<WelcomePage />);
    expect(getByText(/Start your planning:/i));
    expect(getByTestId('btn').textContent).toBe('Connect');
  });
});
