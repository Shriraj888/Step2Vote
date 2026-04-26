/**
 * Application Constants
 *
 * Centralised configuration values used throughout the Step2Vote application.
 * Keeping them in one place improves maintainability and consistency.
 *
 * @module utils/constants
 */

/** API base URL — uses the Vite proxy in development */
export const API_BASE_URL = '/api';

/** Quick-start prompts shown in the chat interface */
export const QUICK_PROMPTS = [
  {
    id: 'register',
    label: 'How to Register',
    icon: '📝',
    prompt: 'How do I register to vote? Walk me through the steps.',
  },
  {
    id: 'timeline',
    label: 'Election Timeline',
    icon: '📅',
    prompt: 'What is the general timeline of a U.S. presidential election?',
  },
  {
    id: 'methods',
    label: 'Voting Methods',
    icon: '🗳️',
    prompt: 'What are the different ways I can cast my vote?',
  },
  {
    id: 'id-requirements',
    label: 'ID Requirements',
    icon: '🪪',
    prompt: 'What identification do I need to bring to the polls?',
  },
  {
    id: 'absentee',
    label: 'Absentee Voting',
    icon: '✉️',
    prompt: 'How does absentee or mail-in voting work?',
  },
  {
    id: 'first-time',
    label: 'First-Time Voter',
    icon: '🌟',
    prompt: 'I\'m a first-time voter. What do I need to know?',
  },
];

/** Election process timeline steps used in the Learn page */
export const ELECTION_TIMELINE = [
  {
    id: 1,
    title: 'Check Your Eligibility',
    description: 'Confirm you meet the requirements to vote: U.S. citizenship, age (18+), and state residency.',
    details: [
      'Must be a U.S. citizen',
      'Must be 18 years old by Election Day',
      'Must meet your state\'s residency requirements',
      'Some states restore voting rights to formerly incarcerated individuals',
    ],
    icon: '✅',
    color: '#4CAF50',
  },
  {
    id: 2,
    title: 'Register to Vote',
    description: 'Register before your state\'s deadline. Many states offer online, mail-in, or same-day registration.',
    details: [
      'Check your state\'s registration deadline (typically 15–30 days before election)',
      'Register online at vote.gov or your state\'s election website',
      'Some states allow same-day registration at polling places',
      'Keep your registration up to date if you move or change your name',
    ],
    icon: '📝',
    color: '#2196F3',
  },
  {
    id: 3,
    title: 'Research Candidates & Ballot Measures',
    description: 'Learn about the candidates, their platforms, and any ballot measures or propositions.',
    details: [
      'Visit candidate websites and official voter guides',
      'Review ballot measures and propositions in your area',
      'Attend town halls or debates if available',
      'Check non-partisan resources like vote411.org or ballotpedia.org',
    ],
    icon: '🔍',
    color: '#FF9800',
  },
  {
    id: 4,
    title: 'Know Your Voting Options',
    description: 'Decide how you want to vote: in-person on Election Day, early voting, or absentee/mail-in ballot.',
    details: [
      'In-person voting on Election Day at your assigned polling place',
      'Early voting: available in many states in the weeks before Election Day',
      'Absentee/mail-in voting: request a ballot if you can\'t vote in person',
      'Check your state\'s specific options and deadlines',
    ],
    icon: '🗳️',
    color: '#9C27B0',
  },
  {
    id: 5,
    title: 'Prepare for Election Day',
    description: 'Get everything ready: check your polling location, gather required ID, and plan transportation.',
    details: [
      'Confirm your polling location (it may change between elections)',
      'Gather required identification (varies by state)',
      'Plan your transportation to the polling place',
      'Review your sample ballot so you\'re prepared',
    ],
    icon: '📋',
    color: '#F44336',
  },
  {
    id: 6,
    title: 'Cast Your Vote',
    description: 'Head to the polls, cast your ballot, and make your voice heard!',
    details: [
      'Polls typically open between 6:00–7:00 AM and close between 7:00–8:00 PM',
      'If you\'re in line when polls close, you have the right to vote',
      'Ask for help from a poll worker if you need assistance',
      'Report any issues to your state\'s election hotline',
    ],
    icon: '🎉',
    color: '#00BCD4',
  },
  {
    id: 7,
    title: 'After You Vote',
    description: 'Track your ballot (if mail-in), view results, and stay engaged in civic life.',
    details: [
      'Track your mail-in ballot status online if available',
      'Results are typically announced on election night or shortly after',
      'Close races may take longer to finalize',
      'Stay informed about the inauguration and transition process',
    ],
    icon: '📊',
    color: '#607D8B',
  },
];

/** Voter readiness checklist items */
export const CHECKLIST_ITEMS = [
  {
    id: 'eligible',
    category: 'Eligibility',
    label: 'I confirm I am eligible to vote',
    description: 'U.S. citizen, 18+ years old, and meet state residency requirements',
  },
  {
    id: 'registered',
    category: 'Registration',
    label: 'I am registered to vote',
    description: 'Check your registration status at vote.gov',
  },
  {
    id: 'registration-current',
    category: 'Registration',
    label: 'My registration information is up to date',
    description: 'Name, address, and party affiliation are current',
  },
  {
    id: 'polling-location',
    category: 'Preparation',
    label: 'I know my polling location',
    description: 'Find your polling place at your state election website',
  },
  {
    id: 'id-ready',
    category: 'Preparation',
    label: 'I have the required identification',
    description: 'Check your state\'s ID requirements',
  },
  {
    id: 'research-done',
    category: 'Preparation',
    label: 'I have researched candidates and ballot measures',
    description: 'Review your sample ballot before heading to the polls',
  },
  {
    id: 'voting-method',
    category: 'Voting Plan',
    label: 'I have chosen my voting method',
    description: 'In-person, early voting, or absentee/mail-in',
  },
  {
    id: 'transportation',
    category: 'Voting Plan',
    label: 'I have planned my transportation',
    description: 'Know how you will get to the polling place',
  },
  {
    id: 'time-planned',
    category: 'Voting Plan',
    label: 'I have planned when to vote',
    description: 'Consider off-peak hours to avoid long lines',
  },
];

/** Navigation links used in the header */
export const NAV_LINKS = [
  { path: '/', label: 'Home', icon: '🏠' },
  { path: '/chat', label: 'Ask AI', icon: '💬' },
  { path: '/learn', label: 'Learn', icon: '📚' },
  { path: '/quiz', label: 'Quiz', icon: '❓' },
  { path: '/checklist', label: 'Checklist', icon: '✅' },
];
