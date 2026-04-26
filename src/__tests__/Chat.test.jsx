/**
 * Chat Page Tests
 *
 * Verifies the chat UI rendering, input handling, and accessibility.
 *
 * @module __tests__/Chat.test
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import Chat from '../pages/Chat';

function renderWithRouter(ui) {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
}

describe('Chat Page', () => {
  it('renders the chat title', () => {
    renderWithRouter(<Chat />);
    expect(screen.getByText(/Ask Step2Vote/i)).toBeInTheDocument();
  });

  it('displays the welcome message when no messages exist', () => {
    renderWithRouter(<Chat />);
    expect(screen.getByText(/Welcome to Step2Vote/i)).toBeInTheDocument();
  });

  it('renders quick prompt buttons', () => {
    renderWithRouter(<Chat />);
    expect(screen.getByText('Register with Form 6')).toBeInTheDocument();
    expect(screen.getByText('Election Timeline')).toBeInTheDocument();
    expect(screen.getByText('EVM and VVPAT')).toBeInTheDocument();
  });

  it('has an accessible chat input with label', () => {
    renderWithRouter(<Chat />);
    const input = screen.getByLabelText(/type your question/i);
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('maxLength', '2000');
  });

  it('has a send button that is disabled when input is empty', () => {
    renderWithRouter(<Chat />);
    const sendBtn = screen.getByLabelText(/send message/i);
    expect(sendBtn).toBeDisabled();
  });

  it('enables send button when input has text', async () => {
    const user = userEvent.setup();
    renderWithRouter(<Chat />);
    const input = screen.getByLabelText(/type your question/i);
    await user.type(input, 'How do I register to vote?');
    const sendBtn = screen.getByLabelText(/send message/i);
    expect(sendBtn).not.toBeDisabled();
  });

  it('has proper ARIA roles for chat log', () => {
    renderWithRouter(<Chat />);
    expect(screen.getByRole('log')).toBeInTheDocument();
  });
});
