import React from 'react';
import { render, screen } from '@testing-library/react';
import FormContainer from '../FormContainer';

test('renders the FormContainer component with the children', () => {
    render(
      <FormContainer>
        <div>Form content</div>
      </FormContainer>
    );
    
    // Assert that the component contains the provided children
    const formContent = screen.getByText('Form content');
    expect(formContent).toBeInTheDocument();
  });