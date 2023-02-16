import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';
import { createRoot } from 'react-dom';
import styles from './scss/application.scss';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);

//ReactDOM.render(<App />, document.getElementById('root'));
