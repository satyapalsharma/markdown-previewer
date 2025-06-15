import React from 'react';
import ReactDOM from 'react-dom/client'; // Import from 'react-dom/client' for React 18+
import App from './App';
import './App.css'; // Import global styles for the application

/**
 * src/index.js
 *
 * This is the entry point of the React application.
 * It's responsible for rendering the main App component into the DOM.
 *
 * Uses React 18's createRoot API for concurrent mode capabilities.
 */

// Find the root DOM element where the React application will be mounted.
// This element is typically defined in public/index.html as <div id="root"></div>.
const rootElement = document.getElementById('root');

// Ensure the root element exists before attempting to render.
if (rootElement) {
  // Create a React root for the application.
  // This is the modern way to render React applications starting with React 18.
  const root = ReactDOM.createRoot(rootElement);

  // Render the main App component into the root.
  // React.StrictMode is a tool for highlighting potential problems in an application.
  // It activates additional checks and warnings for its descendants.
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  // Log an error if the root element is not found, which would prevent the app from starting.
  console.error('Failed to find the root element. Make sure there is a <div id="root"> in your public/index.html.');
}