/**
 * useInterval Hook
 *
 * setInterval() doesn't play nicely with hooks. I found this out quickly when
 * trying to implement the random image effect on this site and then I
 * remembered that Dan Abramov had written an article on exactly this topic.
 *
 * This code was lifted directly from  that article:
 * https://overreacted.io/making-setinterval-declarative-with-react-hooks/
 */

import { useEffect, useRef } from 'react'

export const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  });

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
