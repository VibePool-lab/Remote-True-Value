import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

console.log("Remote True Value initialized");
const container = document.getElementById('root');
if (container) {
  console.log("Root container found, rendering app...");
  createRoot(container).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
} else {
  console.error("Critical Error: Root container not found!");
}
