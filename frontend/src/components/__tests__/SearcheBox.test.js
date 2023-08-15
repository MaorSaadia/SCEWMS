import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import SearchBox from '../SearchBox';

// Mock the useNavigate hook
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe('SearchBox', () => {
  test('updates keyword state on input change', () => {
    const { getByPlaceholderText } = render(<SearchBox />);
    const inputElement = getByPlaceholderText('חפש מוצר');

    fireEvent.change(inputElement, { target: { value: 'test' } });

    expect(inputElement.value).toBe('test');
  });

  test('navigates to ProductsScreen with keyword on form submit', () => {
    const navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);

    const { getByPlaceholderText, getByRole } = render(<SearchBox />);
    const inputElement = getByPlaceholderText('חפש מוצר');
    const submitButton = getByRole('button', { type: 'submit' });

    fireEvent.change(inputElement, { target: { value: 'test' } });
    fireEvent.click(submitButton);

    expect(navigate).toHaveBeenCalledWith('/ProductsScreen/?test');
    expect(inputElement.value).toBe('');
  });

  test('navigates to home page on empty keyword submit', () => {
    const navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);

    const { getByRole } = render(<SearchBox />);
    const submitButton = getByRole('button', { type: 'submit' });

    fireEvent.click(submitButton);

    expect(navigate).toHaveBeenCalledWith('/');
  });
});
