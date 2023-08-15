import React from 'react';
import CardProd from '../components/ProductScreen/CardProd';
import { useLocation } from 'react-router-dom';

const PRODUCTS = [
  {
    id: 1,
    img: '/Rodemicromic.jpg',
    header: 'Rode Micro Mic',
    p: ' ',
    a: 'צפה בזמינות',
    href: './RecordingScreen?Rodemicromic',
  },
  //   {
  //     id: 2,
  //     img: 'panasonic_dc_.jpg',
  //     header: 'Panasonic DCS5',
  //     p: ' ',
  //     a: 'צפה בזמינות',
  //     href: './CamerasScreen?PanasonicDCS5',
  //   },
];

const RecordingTypeScreen = () => {
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
      <h1>ציוד הקלטה</h1>
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

export default RecordingTypeScreen;
