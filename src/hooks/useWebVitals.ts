import { useEffect } from 'react';

interface WebVitalMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
}

export const useWebVitals = (reportWebVitals?: (metric: WebVitalMetric) => void) => {
  useEffect(() => {
    if (typeof window === 'undefined' || !reportWebVitals) return;

    // Manual Core Web Vitals measurement
    const measureCLS = () => {
      let clsValue = 0;
      let clsEntries: any[] = [];

      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value;
            clsEntries.push(entry);
          }
        }
        
        reportWebVitals({
          name: 'CLS',
          value: clsValue,
          rating: clsValue < 0.1 ? 'good' : clsValue < 0.25 ? 'needs-improvement' : 'poor',
          delta: clsValue,
          id: 'cls-' + Math.random().toString(36).substr(2, 9),
        });
      });

      if ('PerformanceObserver' in window) {
        try {
          observer.observe({ type: 'layout-shift', buffered: true });
        } catch (e) {
          // Fallback for older browsers
        }
      }
    };

    const measureLCP = () => {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        const value = lastEntry.startTime;
        
        reportWebVitals({
          name: 'LCP',
          value,
          rating: value < 2500 ? 'good' : value < 4000 ? 'needs-improvement' : 'poor',
          delta: value,
          id: 'lcp-' + Math.random().toString(36).substr(2, 9),
        });
      });

      if ('PerformanceObserver' in window) {
        try {
          observer.observe({ type: 'largest-contentful-paint', buffered: true });
        } catch (e) {
          // Fallback for older browsers
        }
      }
    };

    const measureFID = () => {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const value = (entry as any).processingStart - entry.startTime;
          
          reportWebVitals({
            name: 'FID',
            value,
            rating: value < 100 ? 'good' : value < 300 ? 'needs-improvement' : 'poor',
            delta: value,
            id: 'fid-' + Math.random().toString(36).substr(2, 9),
          });
        }
      });

      if ('PerformanceObserver' in window) {
        try {
          observer.observe({ type: 'first-input', buffered: true });
        } catch (e) {
          // Fallback for older browsers
        }
      }
    };

    // Initialize measurements
    measureCLS();
    measureLCP();
    measureFID();
  }, [reportWebVitals]);
};

// Default reporter that sends to Google Analytics
export const defaultWebVitalsReporter = (metric: WebVitalMetric) => {
  // Send to Google Analytics 4
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      non_interaction: true,
      custom_map: {
        metric_rating: metric.rating,
        metric_delta: metric.delta,
      },
    });
  }

  // Send to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Web Vitals] ${metric.name}:`, {
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
      id: metric.id,
    });
  }

  // Send to custom analytics endpoint (optional)
  if (process.env.NODE_ENV === 'production') {
    fetch('/api/analytics/web-vitals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: metric.name,
        value: metric.value,
        rating: metric.rating,
        delta: metric.delta,
        id: metric.id,
        url: window.location.href,
        userAgent: navigator.userAgent,
        timestamp: Date.now(),
      }),
    }).catch((error) => {
      console.error('Failed to send web vitals:', error);
    });
  }
};

// Performance optimization utilities
export const optimizePerformance = () => {
  if (typeof window === 'undefined') return;

  // Preload critical resources
  const preloadCriticalResources = () => {
    const criticalResources = [
      '/images/LogoAurelien-v2.png',
      '/images/PhotoAurelien.png',
      '/videos/video-dent-tête.mp4',
    ];

    criticalResources.forEach((resource) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource;
      
      if (resource.includes('.mp4')) {
        link.as = 'video';
      } else if (resource.includes('.png') || resource.includes('.jpg')) {
        link.as = 'image';
      }
      
      document.head.appendChild(link);
    });
  };

  // Optimize images loading
  const optimizeImages = () => {
    // Add intersection observer for lazy loading
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
              imageObserver.unobserve(img);
            }
          }
        });
      });

      document.querySelectorAll('img[data-src]').forEach((img) => {
        imageObserver.observe(img);
      });
    }
  };

  // Optimize fonts loading
  const optimizeFonts = () => {
    // Preload critical fonts
    const fontLink = document.createElement('link');
    fontLink.rel = 'preload';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
    fontLink.as = 'style';
    fontLink.onload = () => {
      fontLink.rel = 'stylesheet';
    };
    document.head.appendChild(fontLink);
  };

  // Reduce layout shifts
  const reduceLayoutShifts = () => {
    // Add aspect ratio containers for images
    document.querySelectorAll('img').forEach((img) => {
      if (!img.style.aspectRatio && img.width && img.height) {
        img.style.aspectRatio = `${img.width} / ${img.height}`;
      }
    });
  };

  // Execute optimizations
  preloadCriticalResources();
  optimizeImages();
  optimizeFonts();
  reduceLayoutShifts();
};

// Service Worker registration for caching
export const registerServiceWorker = async () => {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return;

  try {
    const registration = await navigator.serviceWorker.register('/sw.js');
    console.log('Service Worker registered:', registration);
    
    // Update available
    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing;
      if (newWorker) {
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            // New content available, notify user
            console.log('New content available, please refresh.');
          }
        });
      }
    });
  } catch (error) {
    console.error('Service Worker registration failed:', error);
  }
};
