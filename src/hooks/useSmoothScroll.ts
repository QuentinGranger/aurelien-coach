import { useEffect } from 'react';

export const useSmoothScroll = () => {
  useEffect(() => {
    // Enhanced smooth scroll for browsers that don't support CSS scroll-behavior
    const smoothScrollTo = (target: Element, duration: number = 800) => {
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - 80; // 80px offset for header
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      let startTime: number | null = null;

      const animation = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
      };

      // Easing function for smooth animation
      const ease = (t: number, b: number, c: number, d: number) => {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
      };

      requestAnimationFrame(animation);
    };

    // Handle anchor links
    const handleAnchorClick = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (!target.matches('a[href^="#"]')) return;

      const href = target.getAttribute('href');
      if (!href || href === '#') return;

      const targetElement = document.querySelector(href);
      if (!targetElement) return;

      e.preventDefault();

      // Check if browser supports smooth scroll
      if ('scrollBehavior' in document.documentElement.style) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      } else {
        // Fallback for older browsers
        smoothScrollTo(targetElement);
      }

      // Update URL without jumping
      if (history.pushState) {
        history.pushState(null, '', href);
      }
    };

    // Add event listener
    document.addEventListener('click', handleAnchorClick);

    // Cleanup
    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);
};

// Utility function to scroll to element programmatically
export const scrollToElement = (selector: string, offset: number = 80) => {
  const element = document.querySelector(selector);
  if (!element) return;

  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;

  if ('scrollBehavior' in document.documentElement.style) {
    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth'
    });
  } else {
    // Fallback smooth scroll
    const startPosition = window.pageYOffset;
    const distance = elementPosition - startPosition;
    const duration = 800;
    let startTime: number | null = null;

    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    };

    const easeInOutQuad = (t: number, b: number, c: number, d: number) => {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    };

    requestAnimationFrame(animation);
  }
};
