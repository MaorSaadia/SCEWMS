import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Footer from '../Footer';

describe('Footer', () => {
  test('renders footer links', () => {
    render(
      <Router>
        <Footer />
      </Router>
    );

    // Assert that the footer links are rendered
    const homeLink = screen.getByText('Home');
    const contactLink = screen.getByText('Contact');
    const productsLink = screen.getByText('Products');
    const aboutUsLink = screen.getByText('About Us');

    expect(homeLink).toBeInTheDocument();
    expect(contactLink).toBeInTheDocument();
    expect(productsLink).toBeInTheDocument();
    expect(aboutUsLink).toBeInTheDocument();
  });

  test('renders the current year', () => {
    render(
      <Router>
        <Footer />
      </Router>
    );
  });
});
