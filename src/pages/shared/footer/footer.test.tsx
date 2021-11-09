import React from 'react';
import { render } from '../../../shared/test-utils';
import Footer from './footer';

describe('Footer component', () => {
  test('renders component', () => {
    const { getByText } = render(<Footer />);
    expect(getByText(/Aleksandr Klychnikov/i));
  });
});
