'use client';

import { useState } from 'react';

export default function Card({ title, children, className = '', icon = null }) {
  return (
    <div className={`bg-white rounded-lg shadow p-6 ${className}`}>
      {(title || icon) && (
        <div className="flex items-center mb-4">
          {icon && (
            <div className="mr-3 text-blue-600">
              {icon}
            </div>
          )}
          {title && <h2 className="text-lg font-semibold text-gray-800">{title}</h2>}
        </div>
      )}
      {children}
    </div>
  );
}
