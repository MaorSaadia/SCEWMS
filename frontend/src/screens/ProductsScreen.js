import React from 'react';
import CardProd from '../components/ProductScreen/CardProd';
import { useLocation } from 'react-router-dom';

const PRODUCTS = [
  {
    id: 1,
    img: '/camera.jpg',
    header: 'Camera',
    p: 'ציוד צילום',
    a: 'כנס',
    href: './CamersTypeScreen',
  },
  {
    id: 2,
    img: '/microphone.jpg',
    header: 'Recording',
    p: 'ציוד הקלטה',
    a: ' כנס',
    href: './RecordingTypeScreen',
  },
  {
    id: 3,
    img: '/ipad.jpg',
    header: 'Tablets',
    p: 'טאבלטים',
    a: 'כנס ',
  },
  {
    id: 4,
    img: '/tripod.jpg',
    header: 'Tripod',
    p: 'חצובות',
    a: 'כנס ',
  },
  {
    id: 5,
    img: '/projector.jpg',
    header: 'Projectors',
    p: 'מקרנים',
    a: 'כנס ',
  },
  {
    id: 6,
    img: '/cables.jpg',
    header: 'Cables',
    p: 'כבלים',
    a: 'כנס ',
  },
  {
    id: 7,
    img: '/lights.jpg',
    header: 'Lights',
    p: 'תאורה',
    a: 'כנס ',
  },
  {
    id: 8,
    img: '/convertors.jpg',
    header: 'Convertos',
    p: 'ממירים',
    a: 'כנס ',
  },
];

const ProductsScreen = () => {
  const { search } = useLocation();

  const keyword = search ? search.split('?')[1] : '';

  const newSearch = '/';

  const filteredProducts = PRODUCTS.filter(
    (product) =>
      product.header.toLowerCase().includes(keyword.toLowerCase()) ||
      product.p.toLowerCase().includes(keyword.toLowerCase())
  );

  if (filteredProducts.length === 0) {
    return <h1> "{keyword}" לא קיים מוצר בשם</h1>;
  }

  return (
    <>
      <hr className="hr-line-right"></hr>
      <h1>ציוד</h1>
      <hr className="hr-line-left"></hr>
      <div>
        <h1> </h1>
        <div className="row row-cols-3 g-4">
          {filteredProducts.map((product) => (
            <div className="col" key={product.id}>
              <CardProd
                img={product.img}
                header={product.header}
                p={product.p}
                a={product.a}
                href={newSearch + product.href}
              />
            </div>
          ))}
        </div>
        <h1> </h1>
      </div>
    </>
  );
};

export default ProductsScreen;
