import {ScrollView, VStack} from 'native-base';
import React from 'react';
import Item from './Item';

const Index = () => {
  return (
    <ScrollView paddingX={6} marginTop={2}>
      <VStack space={3}>
        {items.map((item, idx) => (
          <Item key={idx} {...item} />
        ))}
      </VStack>
    </ScrollView>
  );
};

export default Index;

const items = [
  {
    title:
      'UEI ENGINEERING DRAWING INSTRUMENTS SET / GEOMETRY SET ( 5 ITEMS) Drafting Compass Set',
    ogPrice: 300,
    sellingPrice: 200,
    sellerName: 'Sandeepa Sen',
    contact: '1245891246',
    source: require('../../images/geo-box.jpg'),
  },
  {
    title: 'RS PRO White Unisex Reusable Lab Coat, XL',
    ogPrice: 300,
    sellingPrice: 150,
    sellerName: 'Radhakrishnan',
    contact: '6769081230',
    source: require('../../images/appron.jpg'),
  },
  {
    title: 'PVC Yellow Engineer Safety Helmets, Size: Medium',
    ogPrice: 400,
    sellingPrice: 200,
    sellerName: 'Govind',
    contact: '6769081230',
    source: require('../../images/helmet.jpg'),
  },
  {
    title:
      'Higher Engineering Mathematics by Dr. B. S. Grewal - 42nd edition (Khanna Publishers) ',
    ogPrice: 600,
    sellingPrice: 400,
    sellerName: 'Keshav',
    contact: '6769081230',
    source: require('../../images/book.jpg'),
  },
  {
    title: 'Plastic Drawing Sheet Container',
    ogPrice: 50,
    sellingPrice: 40,
    sellerName: 'Kamal',
    contact: '6769081230',
    source: require('../../images/drawing-sheet-container.jpg'),
  },
  {
    title:
      'Easy To Use Topcon Mini Drafter For Drawing & Drafting at Best Price in Roorkee | Public Instruments',
    ogPrice: 80,
    sellingPrice: 50,
    sellerName: 'Radhey',
    contact: '6769081230',
    source: require('../../images/drafter.jpg'),
  },
];
