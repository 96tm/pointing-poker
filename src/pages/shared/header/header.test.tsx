import React from 'react';
import { render } from '../../../shared/test-utils';
import Header from './header';

describe('Header component', () => {
  test('renders component', () => {
    const el = render(<Header />);
    const elRoot = el.getByTestId('header');
    expect(elRoot.childElementCount).toBe(1);
  });
});
