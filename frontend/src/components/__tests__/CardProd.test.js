import React from 'react';
import { render , screen } from '@testing-library/react';
import CardProd from '../../components/ProductScreen/CardProd';

//Unit test - The app render the component by each of elemnets

describe('CardProd', () => {
    it('renders the correct header', () => {
      const headerText = 'Example Header';
      const { getByText } = render(<CardProd header={headerText} />);
      expect(getByText(headerText)).toBeInTheDocument();
    });
  
    it('renders the correct paragraph text', () => {
      const paragraphText = 'Example paragraph text';
      const { getByText } = render(<CardProd p={paragraphText} />);
      expect(getByText(paragraphText)).toBeInTheDocument();
    });
  
    it('renders the correct link text and href', () => {
      const linkText = 'Example link text';
      const linkHref = 'http://example.com';
      const { getByText } = render(<CardProd a={linkText} href={linkHref} />);
      const linkElement = getByText(linkText);
      expect(linkElement).toBeInTheDocument();
      expect(linkElement).toHaveAttribute('href', linkHref);
    });
  
    it('renders the correct image source', () => {
      const imageSrc = 'http://example.com/image.jpg';
      const { getByAltText } = render(<CardProd img={imageSrc} />);
      expect(getByAltText('pic')).toHaveAttribute('src', imageSrc);
    });
  });