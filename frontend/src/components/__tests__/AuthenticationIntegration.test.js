import React from 'react';
import { AuthProvider } from '../../context/AuthContext';
const { render } = require('@testing-library/react');
import App from '../../App';

test("Loggoin integration", async () => {

    sessionStorage.setItem('is-authenticated', 'true');
    sessionStorage.setItem('user', {username: "admin"});

    render(<App/>, { wrapper: AuthProvider });
    
})
