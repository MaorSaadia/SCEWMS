import React from 'react';
import { render } from '@testing-library/react';
import Card from '../Card';


describe('Card', () => {
    test('renders the card component with correct class and style', () => {
      const className = 'custom-card';
      const style = { backgroundColor: 'red' };
  
      const { getByText, container } = render(
        <Card className={className} style={style}>
          <span>Card content</span>
        </Card>
      );
  
      // Assert that the card component has the correct class and style
      expect(container.firstChild).toHaveClass(className);
      expect(container.firstChild).toHaveStyle(style);
  
      // Assert that the card content is rendered correctly
      expect(getByText('Card content')).toBeInTheDocument();
    });
  });