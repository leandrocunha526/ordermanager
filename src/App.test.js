import { render, screen } from '@testing-library/react';
import App from './App';

test('renders entrar react link', () => {
  render(<App />);
  const linkElement = screen.getAllByText(/Entrar/i);
  expect(linkElement).toBeDefined();
});
