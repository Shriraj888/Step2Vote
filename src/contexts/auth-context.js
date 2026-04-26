import { createContext } from 'react';

export const AuthContext = createContext({
  currentUser: null,
  loading: false,
  signup: () => Promise.reject(new Error('Firebase Authentication is not configured.')),
  login: () => Promise.reject(new Error('Firebase Authentication is not configured.')),
  logout: () => Promise.resolve(),
});
