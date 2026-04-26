/**
 * Accessibility Tests
 *
 * Verifies that key pages meet WCAG 2.1 AA accessibility standards
 * using jest-axe automated checks.
 *
 * @module __tests__/accessibility.test
 */

import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { BrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import Learn from '../pages/Learn';
import Checklist from '../pages/Checklist';

expect.extend(toHaveNoViolations);

function renderWithRouter(ui) {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
}

describe('Accessibility (WCAG 2.1 AA)', () => {
  it('Home page has no accessibility violations', async () => {
    const { container } = renderWithRouter(<Home />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('Learn page has no accessibility violations', async () => {
    const { container } = renderWithRouter(<Learn />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('Checklist page has no accessibility violations', async () => {
    window.localStorage.clear();
    const { container } = renderWithRouter(<Checklist />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
