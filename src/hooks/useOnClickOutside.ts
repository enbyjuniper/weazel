import React from 'react';

export const useOnClickOutside = <T extends HTMLElement>(
  handler: (e: Event) => void,
  excludeElement?: Element,
  excludeClassName?: string,
): React.RefObject<T> => {
  const ref = React.useRef<T>(null);

  React.useEffect(() => {
    const listener = (event: Event) => {
      const isTargetInRef = ref.current?.contains((event?.target as Element) || null);
      const isTargetInExcludedElement = excludeElement && excludeElement?.contains(event?.target as Element);
      const isTargetExcludedBasedOnClassName =
        excludeClassName && (event.target as Element).classList.contains(excludeClassName);
      if (isTargetInRef || isTargetInExcludedElement || isTargetExcludedBasedOnClassName) {
        return;
      }
      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [handler, excludeElement, excludeClassName]);

  return ref;
};
