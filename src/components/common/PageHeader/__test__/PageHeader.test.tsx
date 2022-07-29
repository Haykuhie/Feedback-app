import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PageHeader from '..';

it('should render the same text passed into pageTitle prop', () => {
  render(<PageHeader pageTitle="Survey" />);
  const headingElement = screen.getByRole('heading', { name: /Survey/ });
  expect(headingElement).toBeInTheDocument();
});
