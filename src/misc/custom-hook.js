import { useCallback, useState, useEffect } from 'react';
import { database } from './firebase';

export function useModalState(defaultValue = false) {
  const [isOpen, setIsOpen] = useState(defaultValue); // <------------------ isOpen

  // using useCallBack() hook for these two so new copies of these functions don't have to be created on every re-render
  const open = useCallback(() => {
    setIsOpen(true);
  }, []);
  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  return { isOpen, open, close }; // <------------------ isOpen
}

export const useMediaQuery = query => {
  const [matches, setMatches] = useState(() => {
    // eslint-disable-next-line no-unused-expressions
    window.matchMedia(query).matches;
  });

  useEffect(() => {
    const queryList = window.matchMedia(query);
    setMatches(queryList.matches);

    const listener = evt => {
      setMatches(evt.matches);
    };

    queryList.addListener(listener);
    return () => {
      queryList.removeListener(listener);
    };
  }, [query]);

  return matches;
};

export function usePresence(uid) {
  const [presence, setPresence] = useState(null);

  useEffect(() => {
    const userStatusRef = database.ref(`/status/${uid}`);

    userStatusRef.on('value', snap => {
      if (snap.exists()) {
        const data = snap.val();

        setPresence(data);
      }
    });

    return () => {
      userStatusRef.off();
    };
  }, [uid]);

  return presence;
}
