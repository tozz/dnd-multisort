import React from 'react';
import ReactDOM from 'react-dom/client';
import { Component } from './component';

document.addEventListener('readystatechange', () => {
  if (document.readyState === 'complete') {
    const root = ReactDOM.createRoot(document.getElementById('root') as HTMLDivElement);
    root.render(
      <React.StrictMode>
        <Component />
      </React.StrictMode>
    );
  }
});
