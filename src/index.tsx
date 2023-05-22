import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
//import styles from './scss/application.scss';
import './scss/application.scss';
// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

const rootElement = document.getElementById('root')!;
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
