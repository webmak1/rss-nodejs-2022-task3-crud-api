import { Utils } from 'utils';
import { v4 as uuidv4 } from 'uuid';
import products from '../../products.json';

const findAll = () => {
  return new Promise((resolve, _reject) => {
    resolve(products);
  });
};

const findById = (id: any) => {
  return new Promise((resolve, _reject) => {
    const product = products.find((p) => p.id === id);
    resolve(product);
  });
};

const create = (product: any) => {
  return new Promise((resolve, _reject) => {
    const newProduct = { id: uuidv4(), ...product };
    products.push(newProduct);
    Utils.writeDataToFile('./products.json', products);
    resolve(newProduct);
  });
};

const update = (id: any, product: any) => {
  return new Promise((resolve, _reject) => {
    const index = products.findIndex((p) => {
      p.id === id;
    });
    products[index] = { id, ...product };

    console.log('---');
    console.log(products);
    console.log('---');

    Utils.writeDataToFile('./products.json', products);
    resolve(products[index]);
  });
};

const remove = (_id: any) => {
  return [];
  // return new Promise((resolve, _reject) => {
  //   // products = products.filter((p) => p.id !== id);
  //   // Utils.writeDataToFile('./products.json', products);
  //   // resolve();
  // });
};

export const Product = {
  findAll,
  findById,
  create,
  update,
  remove,
};
