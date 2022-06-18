import { User } from 'users/InMemoryDb';
import { Utils } from 'utils';

const getAll = async (_req: any, res: any) => {
  try {
    const products = await User.findAll();

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(products));
  } catch (error) {
    console.log(error);
  }
};

const getById = async (_req: any, res: any, id: any) => {
  try {
    const product = await User.findById(id);

    if (!product) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(JSON.stringify({ message: 'User Not Found' })));
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(product));
    }
  } catch (error) {
    console.log(error);
  }
};

const create = async (req: any, res: any) => {
  try {
    const body = await Utils.getPostData(req);

    // @ts-ignore
    const { username, age, hobbies } = JSON.parse(body);

    const user = {
      username,
      age,
      hobbies,
    };

    // @ts-ignore
    const newProduct = await User.create(user);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(newProduct));
  } catch (error) {
    console.log(error);
  }
};

const update = async (req: any, res: any, id: string) => {
  try {
    const user = await User.findById(id);

    if (!user) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(JSON.stringify({ message: 'User Not Found' })));
    } else {
      const body = await Utils.getPostData(req);

      // @ts-ignore
      const { username, age, hobbies } = JSON.parse(body);

      // @ts-ignore
      const userData = {
        // @ts-ignore
        username: username || user.username,
        // @ts-ignore
        age: age || user.age,
        // @ts-ignore
        hobbies: hobbies || user.hobbies,
      };

      // @ts-ignore
      const updProduct = await User.update(id, userData);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify(updProduct));
    }
  } catch (error) {
    console.log(error);
  }
};

const remove = async (_req: any, res: any, id: any) => {
  try {
    const product = await User.findById(id);

    if (!product) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(JSON.stringify({ message: 'User Not Found' })));
    } else {
      await User.remove(id);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: `User ${id} removed` }));
    }
  } catch (error) {
    console.log(error);
  }
};

export const Controller = {
  getAll,
  getById,
  create,
  update,
  remove,
};
