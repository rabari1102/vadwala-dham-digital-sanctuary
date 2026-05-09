import { useEffect, useRef, useCallback } from 'react';

export function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const el = ref.current;
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, []);

  return ref;
}

/** Observe all .fade-in-section children within a container.
 *  Uses MutationObserver so dynamically loaded content gets observed too. */
export function useFadeInAll() {
  const ref = useRef<HTMLDivElement>(null);

  const observeChildren = useCallback((container: HTMLElement, io: IntersectionObserver) => {
    container.querySelectorAll('.fade-in-section').forEach((child) => {
      if (!child.classList.contains('visible')) {
        io.observe(child);
      }
    });
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const el = ref.current;
    if (!el) return;

    // Observe existing children
    observeChildren(el, io);

    // Watch for dynamically added children (async API data)
    const mo = new MutationObserver(() => {
      observeChildren(el, io);
    });
    mo.observe(el, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [observeChildren]);

  return ref;
}
