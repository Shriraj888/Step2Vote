/**
 * Home Page Tests
 *
 * Verifies rendering, navigation links, accessibility, and content integrity.
 *
 * @module __tests__/Home.test
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';

/** Helper to render component within Router context */
function renderWithRouter(ui) {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
}

describe('Home Page', () => {
  it('renders the hero heading', () => {
    renderWithRouter(<Home />);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('displays the hero badge text', () => {
    renderWithRouter(<Home />);
    expect(screen.getByText(/election education companion/i)).toBeInTheDocument();
  });

  it('renders all feature cards', () => {
    renderWithRouter(<Home />);
    expect(screen.getByText('Ask the AI Assistant')).toBeInTheDocument();
    expect(screen.getByText('Interactive ECI Timeline')).toBeInTheDocument();
    expect(screen.getByText('Test Your Knowledge')).toBeInTheDocument();
    expect(screen.getByText('Firebase-Synced Checklist')).toBeInTheDocument();
  });

  it('renders CTA buttons with correct links', () => {
    renderWithRouter(<Home />);
    const chatBtn = screen.getByText(/ask a question/i).closest('a');
    const learnBtn = screen.getByText(/explore the timeline/i).closest('a');
    expect(chatBtn).toHaveAttribute('href', '/chat');
    expect(learnBtn).toHaveAttribute('href', '/learn');
  });

  it('renders the how-it-works section', () => {
    renderWithRouter(<Home />);
    expect(screen.getByText('How Step2Vote Works')).toBeInTheDocument();
    expect(screen.getByText('Choose a Civic Topic')).toBeInTheDocument();
    expect(screen.getByText('Get Grounded Answers')).toBeInTheDocument();
    expect(screen.getByText('Prepare and Save Progress')).toBeInTheDocument();
  });

  it('feature cards have unique IDs for testing', () => {
    renderWithRouter(<Home />);
    expect(document.getElementById('feature-chat')).toBeInTheDocument();
    expect(document.getElementById('feature-learn')).toBeInTheDocument();
    expect(document.getElementById('feature-quiz')).toBeInTheDocument();
    expect(document.getElementById('feature-checklist')).toBeInTheDocument();
  });
});
