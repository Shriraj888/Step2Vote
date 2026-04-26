/**
 * Learn Page Tests
 *
 * Verifies the timeline rendering, expandable steps, and accessibility.
 *
 * @module __tests__/Learn.test
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import Learn from '../pages/Learn';

function renderWithRouter(ui) {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
}

describe('Learn Page', () => {
  it('renders the page title', () => {
    renderWithRouter(<Learn />);
    expect(screen.getByText(/Election Process Timeline/i)).toBeInTheDocument();
  });

  it('renders all 7 timeline steps', () => {
    renderWithRouter(<Learn />);
    expect(screen.getByText(/Check Your Eligibility/i)).toBeInTheDocument();
    expect(screen.getByText(/Register to Vote/i)).toBeInTheDocument();
    expect(screen.getByText(/Research Candidates/i)).toBeInTheDocument();
    expect(screen.getByText(/Know Your Voting Options/i)).toBeInTheDocument();
    expect(screen.getByText(/Prepare for Election Day/i)).toBeInTheDocument();
    expect(screen.getByText(/Cast Your Vote/i)).toBeInTheDocument();
    expect(screen.getByText(/After You Vote/i)).toBeInTheDocument();
  });

  it('expands step details when clicked', async () => {
    const user = userEvent.setup();
    renderWithRouter(<Learn />);

    const firstStepBtn = screen.getByRole('button', { name: /check your eligibility/i });
    expect(firstStepBtn).toHaveAttribute('aria-expanded', 'false');

    await user.click(firstStepBtn);
    expect(firstStepBtn).toHaveAttribute('aria-expanded', 'true');
  });

  it('collapses step when clicked again', async () => {
    const user = userEvent.setup();
    renderWithRouter(<Learn />);

    const firstStepBtn = screen.getByRole('button', { name: /check your eligibility/i });
    await user.click(firstStepBtn);
    expect(firstStepBtn).toHaveAttribute('aria-expanded', 'true');

    await user.click(firstStepBtn);
    expect(firstStepBtn).toHaveAttribute('aria-expanded', 'false');
  });

  it('has a timeline list with proper ARIA role', () => {
    renderWithRouter(<Learn />);
    expect(screen.getByRole('list', { name: /election process steps/i })).toBeInTheDocument();
  });
});
