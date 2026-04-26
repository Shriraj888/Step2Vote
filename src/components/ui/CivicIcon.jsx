const ICON_LABELS = {
  ai: 'AI',
  booth: 'Booth',
  check: 'Check',
  civic: 'Civic',
  eci: 'ECI',
  evm: 'EVM',
  form: 'Form',
  guide: 'Guide',
  home: 'Home',
  info: 'Info',
  learn: 'Learn',
  login: 'Sign in',
  logout: 'Sign out',
  map: 'Map',
  mcc: 'MCC',
  new: 'New voter',
  ok: 'OK',
  poll: 'Poll',
  quiz: 'Quiz',
  register: 'Register',
  rights: 'Rights',
  safe: 'Safe',
  time: 'Timeline',
};

export default function CivicIcon({ name = 'civic', className = '' }) {
  const label = ICON_LABELS[name] || ICON_LABELS.civic;

  return (
    <span
      className={`civic-icon civic-icon--${name} ${className}`}
      aria-hidden="true"
      data-label={label}
    />
  );
}
