/**
 * Vitest Test Setup
 *
 * Configures testing environment with jest-dom matchers
 * for better DOM assertion support.
 */

import '@testing-library/jest-dom';
import React from 'react';

globalThis.React = React;
