import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/index.css';

const container = document.getElementById('root');

if (!container) {
  throw new Error('ERROR');
}

const root = createRoot(container);
root.render(<App />);
