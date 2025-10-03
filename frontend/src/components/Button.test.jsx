import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from './Button';

describe('Button Component', () => {

  it('should render the correct text', () => {
    const buttonText = 'Test-knapp';
    render(<Button text={buttonText} />);
    const button = screen.getByRole('button', { name: buttonText });
    expect(button).toBeInTheDocument();
  });
});

