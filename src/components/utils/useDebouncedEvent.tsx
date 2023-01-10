import { useEffect, useRef } from 'react';

interface DebouncedHandlerProps {
  eventName: string;
  handler: (event: any) => void;
  delay: number;
}

export const useDebouncedEvent = ({
  eventName,
  handler,
  delay,
}: DebouncedHandlerProps) => {
  const isMounted = useRef(true);
  const debouncedHandler = useRef(debounce(handler, delay, isMounted));


  useEffect(() => {
    debouncedHandler.current = debounce(handler, delay, isMounted);
  }, [handler, delay]);

  useEffect(() => {
    window.addEventListener(eventName, debouncedHandler.current);
    return () => {
      isMounted.current = false;
      window.removeEventListener(eventName, debouncedHandler.current);
    };
  }, [eventName]);
};

function debounce(
  fn: (event: any) => void,
  delay: number,
  isMounted: React.MutableRefObject<boolean>
) {
  let timeoutId: NodeJS.Timeout | null;
  return function (event: any) {
    if (!isMounted.current) return;
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fn(event);
      timeoutId = null;
    }, delay);
  };
}
