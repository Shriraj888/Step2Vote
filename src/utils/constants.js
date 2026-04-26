/**
 * Application Constants
 *
 * Centralised configuration values used throughout the Step2Vote application.
 * Keeping them in one place improves maintainability and problem alignment.
 *
 * @module utils/constants
 */

/** API base URL - uses the Vite proxy in development. */
export const API_BASE_URL = '/api';

/** Quick-start prompts shown in the chat interface. */
export const QUICK_PROMPTS = [
  {
    id: 'register',
    label: 'Register with Form 6',
    icon: 'register',
    prompt: 'How can an eligible Indian citizen register as a voter using Form 6 or the Voters Services Portal?',
  },
  {
    id: 'timeline',
    label: 'Election Timeline',
    icon: 'time',
    prompt: 'Explain the main stages of an Indian election from notification to result declaration.',
  },
  {
    id: 'evm-vvpat',
    label: 'EVM and VVPAT',
    icon: 'evm',
    prompt: 'How do EVMs and VVPATs work at an Indian polling station?',
  },
  {
    id: 'booth',
    label: 'Polling Booth',
    icon: 'booth',
    prompt: 'How do I find my polling booth and what should I carry on polling day in India?',
  },
  {
    id: 'mcc',
    label: 'Model Code',
    icon: 'mcc',
    prompt: 'What is the Model Code of Conduct and why does it matter during Indian elections?',
  },
  {
    id: 'first-time',
    label: 'First-Time Voter',
    icon: 'new',
    prompt: 'I am a first-time voter in India. What should I do before and on polling day?',
  },
];

/** Election process timeline steps used in the Learn page. */
export const ELECTION_TIMELINE = [
  {
    id: 1,
    title: 'Check Your Eligibility',
    description: 'Confirm that you are an Indian citizen, at least 18 years old on the qualifying date, and ordinarily resident in your constituency.',
    details: [
      'You must be an Indian citizen.',
      'You must be 18 years or older on the ECI qualifying date for the electoral roll.',
      'You should be ordinarily resident at the address where you apply.',
      'You should not be disqualified from voting under applicable election law.',
    ],
    icon: 'ok',
    color: '#2E7D32',
  },
  {
    id: 2,
    title: 'Register or Update Your Details',
    description: 'Use official ECI channels such as the Voters Services Portal, voter helpline app, or Booth Level Officer support.',
    details: [
      'Use Form 6 for new voter registration.',
      'Use Form 8 for corrections, address changes, or EPIC replacement requests.',
      'Track application status through the Voters Services Portal or voter helpline app.',
      'Verify your name on the electoral roll before polling day.',
    ],
    icon: 'form',
    color: '#1565C0',
  },
  {
    id: 3,
    title: 'Understand the Election Type',
    description: 'Learn whether you are voting in a Lok Sabha, State Assembly, local body, by-election, or other notified election.',
    details: [
      'Lok Sabha elections choose Members of Parliament for the House of the People.',
      'State Assembly elections choose Members of the Legislative Assembly.',
      'Local body elections cover municipal and Panchayati Raj institutions where applicable.',
      'Official schedules are announced by the Election Commission of India or the relevant State Election Commission.',
    ],
    icon: 'civic',
    color: '#EF6C00',
  },
  {
    id: 4,
    title: 'Find Your Polling Station',
    description: 'Confirm your polling booth, part number, serial number, and accepted identification before you travel.',
    details: [
      'Search your name in the electoral roll using EPIC number or personal details.',
      'Note your polling station address, part number, and serial number.',
      'Carry your EPIC card or another ECI-approved identity document.',
      'Check accessibility support if you need assistance at the polling station.',
    ],
    icon: 'map',
    color: '#6A1B9A',
  },
  {
    id: 5,
    title: 'Learn the Polling Day Flow',
    description: 'Know what happens inside the polling station so the process feels predictable and accessible.',
    details: [
      'Polling officials verify your identity and mark your entry in the register.',
      'Indelible ink is applied after verification.',
      'You cast your vote on the EVM and can verify the VVPAT slip for a few seconds.',
      'Ask polling staff for assistance if you are unsure or need accessibility support.',
    ],
    icon: 'poll',
    color: '#C62828',
  },
  {
    id: 6,
    title: 'Follow Safe and Non-Partisan Conduct',
    description: 'Respect the secrecy of vote, polling station rules, and the Model Code of Conduct.',
    details: [
      'Do not photograph your vote or reveal another voter choice.',
      'Avoid campaigning or political display inside restricted polling areas.',
      'Report intimidation, impersonation, or misinformation to election authorities.',
      'Use official ECI and CEO sources for final instructions.',
    ],
    icon: 'safe',
    color: '#00838F',
  },
  {
    id: 7,
    title: 'Track Results and Stay Engaged',
    description: 'Follow official counting updates and continue civic participation after voting.',
    details: [
      'Results are declared through official ECI or State Election Commission channels.',
      'Close contests may take time because counting and verification must be completed.',
      'Keep your voter details updated if you move or need corrections.',
      'Share official voter education resources with first-time voters in your community.',
    ],
    icon: 'info',
    color: '#455A64',
  },
];

/** Voter readiness checklist items. */
export const CHECKLIST_ITEMS = [
  {
    id: 'eligible',
    category: 'Eligibility',
    label: 'I have confirmed that I am eligible to vote in India',
    description: 'Indian citizen, 18+ on the qualifying date, ordinarily resident, and not disqualified.',
  },
  {
    id: 'registered',
    category: 'Registration',
    label: 'My name is on the electoral roll',
    description: 'Verify your status through the Voters Services Portal, voter helpline app, or BLO.',
  },
  {
    id: 'registration-current',
    category: 'Registration',
    label: 'My EPIC and address details are correct',
    description: 'Use Form 8 if your name, address, or other roll details need correction.',
  },
  {
    id: 'polling-location',
    category: 'Preparation',
    label: 'I know my assigned polling station',
    description: 'Save the polling station address, part number, and serial number from official lookup.',
  },
  {
    id: 'id-ready',
    category: 'Preparation',
    label: 'I have an accepted identity document ready',
    description: 'Carry EPIC or another ECI-approved photo identity document on polling day.',
  },
  {
    id: 'candidate-awareness',
    category: 'Preparation',
    label: 'I have reviewed candidates through official/non-partisan sources',
    description: 'Use official affidavits, ECI resources, and credible non-partisan information.',
  },
  {
    id: 'evm-vvpat',
    category: 'Polling Day',
    label: 'I understand how to use EVM and verify VVPAT',
    description: 'Press the button for your chosen candidate and check the VVPAT slip window briefly.',
  },
  {
    id: 'accessibility',
    category: 'Polling Day',
    label: 'I have planned any accessibility or assistance needs',
    description: 'Check available support for senior citizens, persons with disabilities, or assisted voting.',
  },
  {
    id: 'conduct',
    category: 'Polling Day',
    label: 'I know the secrecy and conduct rules',
    description: 'Do not photograph your vote, campaign inside restricted areas, or share misinformation.',
  },
];

/** Navigation links used in the header. */
export const NAV_LINKS = [
  { path: '/', label: 'Home', icon: 'home' },
  { path: '/chat', label: 'Ask AI', icon: 'ai' },
  { path: '/learn', label: 'Learn', icon: 'learn' },
  { path: '/quiz', label: 'Quiz', icon: 'quiz' },
  { path: '/checklist', label: 'Checklist', icon: 'check' },
];
