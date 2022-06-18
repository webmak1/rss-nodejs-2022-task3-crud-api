import { Product } from 'models/productModel';
import { Utils } from 'utils';

const getProducts = async (_req: any, res: any) => {
  try {
    const products = await Product.findAll();

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(products));
  } catch (error) {
    console.log(error);
  }
};

const getProduct = async (_req: any, res: any, id: any) => {
  try {
    const product = await Product.findById(id);

    if (!product) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(JSON.stringify({ message: 'Product Not Found' })));
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(product));
    }
  } catch (error) {
    console.log(error);
  }
};

const createProduct = async (req: any, res: any) => {
  try {
    const body = await Utils.getPostData(req);

    // @ts-ignore
    const { title, description, price } = JSON.parse(body);

    const product = {
      title,
      description,
      price,
    };

    const newProduct = await Product.create(product);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(newProduct));
  } catch (error) {
    console.log(error);
  }
};

const updateProduct = async (req: any, res: any, id: any) => {
  try {
    const product = await Product.findById(id);

    if (!product) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(JSON.stringify({ message: 'Product Not Found' })));
    } else {
      const body = await Utils.getPostData(req);

      // @ts-ignore
      const { title, description, price } = JSON.parse(body);

      // @ts-ignore
      const productData = {
        // @ts-ignore
        title: title || product.title,
        // @ts-ignore
        description: description || product.description,
        // @ts-ignore
        price: price || product.price,
      };

      const updProduct = await Product.update(id, productData);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify(updProduct));
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteProduct = async (_req: any, res: any, id: any) => {
  try {
    const product = await Product.findById(id);

    if (!product) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(JSON.stringify({ message: 'Product Not Found' })));
    } else {
      await Product.remove(id);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: `Product ${id} removed` }));
    }
  } catch (error) {
    console.log(error);
  }
};

export const Controller = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
