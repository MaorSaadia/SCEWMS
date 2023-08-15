import React from 'react';
import { render, screen } from '@testing-library/react';
import AboutUsScreen from '../../screens/AboutUsScreen';

describe('AboutUsScreen', () => {
  test('renders About Us content', () => {
    render(<AboutUsScreen />);

    // Check if the key elements and content are rendered correctly
    const headingElement = screen.getByRole('heading', { level: 2, name: /About Us/i });
    const teamHeadingElement = screen.getByRole('heading', { level: 3, name: /Our Team of Developers/i });
    const keyFeaturesHeadingElement = screen.getByRole('heading', { level: 4, name: /Key Features/i });
    const bulletListElement = screen.getByRole('list');
    const descriptionElement = screen.getByText(/Our project is the result of the collaborative efforts/i);

    expect(headingElement).toBeInTheDocument();
    expect(teamHeadingElement).toBeInTheDocument();
    expect(keyFeaturesHeadingElement).toBeInTheDocument();
    expect(bulletListElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
  });
});
