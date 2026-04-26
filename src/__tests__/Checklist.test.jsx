/**
 * Checklist Page Tests
 *
 * Verifies checklist rendering, toggle interaction, and progress tracking.
 *
 * @module __tests__/Checklist.test
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import Checklist from '../pages/Checklist';

function renderWithRouter(ui) {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
}

describe('Checklist Page', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    window.localStorage.clear();
  });

  it('renders the page title', () => {
    renderWithRouter(<Checklist />);
    expect(screen.getByText(/Voter Readiness Checklist/i)).toBeInTheDocument();
  });

  it('renders progress indicator starting at 0%', () => {
    renderWithRouter(<Checklist />);
    expect(screen.getByText('0% Complete')).toBeInTheDocument();
  });

  it('renders all category groups', () => {
    renderWithRouter(<Checklist />);
    expect(screen.getByText('Eligibility')).toBeInTheDocument();
    expect(screen.getByText('Registration')).toBeInTheDocument();
    expect(screen.getByText('Preparation')).toBeInTheDocument();
    expect(screen.getByText('Voting Plan')).toBeInTheDocument();
  });

  it('toggles a checklist item when clicked', async () => {
    const user = userEvent.setup();
    renderWithRouter(<Checklist />);

    const checkbox = screen.getByLabelText(/I confirm I am eligible to vote/i);
    expect(checkbox).not.toBeChecked();

    await user.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it('updates progress when items are checked', async () => {
    const user = userEvent.setup();
    renderWithRouter(<Checklist />);

    const checkbox = screen.getByLabelText(/I confirm I am eligible to vote/i);
    await user.click(checkbox);

    // Progress should be > 0%
    expect(screen.queryByText('0% Complete')).not.toBeInTheDocument();
  });

  it('all checkboxes have associated descriptions', () => {
    renderWithRouter(<Checklist />);
    const checkboxes = screen.getAllByRole('checkbox');
    checkboxes.forEach((cb) => {
      expect(cb).toHaveAttribute('aria-describedby');
    });
  });
});
