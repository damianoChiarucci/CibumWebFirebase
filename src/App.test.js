import { render, screen } from '@testing-library/react';
import App from './App';
import Lista from './Lista';

test('renders learn react link', () => {
  render(<Lista />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
