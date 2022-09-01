import React from 'react';
import { render } from 'react-dom';
import App from './App.js';
import { UserContextProvider } from './Contexts/UserContext'

render(
        <React.StrictMode>
            <UserContextProvider>
                <App />
            </UserContextProvider>
        </React.StrictMode>,
    document.getElementById('root')
);
