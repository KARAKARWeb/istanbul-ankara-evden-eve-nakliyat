'use client';

import { useEffect, useState } from 'react';

export function CustomScripts() {
  const [codes, setCodes] = useState<any>(null);

  useEffect(() => {
    fetch('/api/settings/custom-codes')
      .then(res => res.json())
      .then(data => setCodes(data))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!codes) return;

    // Google Analytics
    if (codes.googleAnalytics) {
      const script = document.createElement('div');
      script.innerHTML = codes.googleAnalytics;
      const scripts = script.querySelectorAll('script');
      scripts.forEach(s => {
        const newScript = document.createElement('script');
        if (s.src) {
          newScript.src = s.src;
          newScript.defer = true;
        }
        if (s.async) newScript.async = true;
        if (s.innerHTML) newScript.innerHTML = s.innerHTML;
        document.head.appendChild(newScript);
      });
    }

    // Google Tag Manager
    if (codes.googleTagManager) {
      const script = document.createElement('div');
      script.innerHTML = codes.googleTagManager;
      const scripts = script.querySelectorAll('script');
      scripts.forEach(s => {
        const newScript = document.createElement('script');
        if (s.src) {
          newScript.src = s.src;
          newScript.defer = true;
        }
        if (s.async) newScript.async = true;
        if (s.innerHTML) newScript.innerHTML = s.innerHTML;
        document.head.appendChild(newScript);
      });
    }

    // Facebook Pixel
    if (codes.facebookPixel) {
      const script = document.createElement('div');
      script.innerHTML = codes.facebookPixel;
      const scripts = script.querySelectorAll('script');
      scripts.forEach(s => {
        const newScript = document.createElement('script');
        if (s.src) {
          newScript.src = s.src;
          newScript.defer = true;
        }
        if (s.async) newScript.async = true;
        if (s.innerHTML) newScript.innerHTML = s.innerHTML;
        document.head.appendChild(newScript);
      });
    }

    // Custom Head Scripts
    if (codes.headScripts) {
      const script = document.createElement('div');
      script.innerHTML = codes.headScripts;
      const scripts = script.querySelectorAll('script');
      scripts.forEach(s => {
        const newScript = document.createElement('script');
        if (s.src) {
          newScript.src = s.src;
          newScript.defer = true;
        }
        if (s.async) newScript.async = true;
        if (s.innerHTML) newScript.innerHTML = s.innerHTML;
        document.head.appendChild(newScript);
      });
    }
  }, [codes]);

  return null;
}

export function CustomBodyScripts() {
  const [codes, setCodes] = useState<any>(null);

  useEffect(() => {
    fetch('/api/settings/custom-codes')
      .then(res => res.json())
      .then(data => setCodes(data))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!codes || !codes.bodyScripts) return;

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = codes.bodyScripts;
    
    // Insert all elements at the beginning of body
    const body = document.body;
    while (tempDiv.firstChild) {
      body.insertBefore(tempDiv.firstChild, body.firstChild);
    }
  }, [codes]);

  return null;
}

export function CustomFooterScripts() {
  const [codes, setCodes] = useState<any>(null);

  useEffect(() => {
    fetch('/api/settings/custom-codes')
      .then(res => res.json())
      .then(data => setCodes(data))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!codes || !codes.footerScripts) return;

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = codes.footerScripts;
    
    // Append all elements to body
    const body = document.body;
    while (tempDiv.firstChild) {
      body.appendChild(tempDiv.firstChild);
    }
  }, [codes]);

  return null;
}
