import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import {store} from './app/store';
import App from './App';

import "./css/index.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
    <App />
    </Provider>
);
