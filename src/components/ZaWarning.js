'use client';

import React, { useState, useEffect } from 'react';
import Strings from '../utils/strings.js';

export default function ZaWarning() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`
      mx-auto bg-blue-500 text-white p-3 mb-4 rounded-lg text-center
      transition-all duration-500
      ${show ? 'opacity-100' : 'opacity-0 h-0 py-0 mb-0 overflow-hidden'}
    `}>
      {Strings.APP_WARNING}
    </div>
  );
}