import { doc, getDoc, getFirestore, serverTimestamp, setDoc } from 'firebase/firestore';
import { app } from '../firebase';

const db = app ? getFirestore(app) : null;

function getChecklistRef(userId) {
  return doc(db, 'users', userId, 'appState', 'voterChecklist');
}

export async function loadChecklistProgress(userId) {
  if (!db || !userId) return null;

  const snapshot = await getDoc(getChecklistRef(userId));
  if (!snapshot.exists()) return null;

  const data = snapshot.data();
  return data.items && typeof data.items === 'object' ? data.items : null;
}

export async function saveChecklistProgress(userId, items) {
  if (!db || !userId) return;

  await setDoc(getChecklistRef(userId), {
    items,
    updatedAt: serverTimestamp(),
    source: 'step2vote-web',
  }, { merge: true });
}
