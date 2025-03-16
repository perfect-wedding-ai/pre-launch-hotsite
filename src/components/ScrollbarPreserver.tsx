"use client"

import { useEffect } from 'react';

export default function ScrollbarPreserver() {
  useEffect(() => {
    document.body.style.overflowY = 'scroll';
    
    return () => {
      document.body.style.overflowY = '';
    };
  }, []);
  
  return null;
} 