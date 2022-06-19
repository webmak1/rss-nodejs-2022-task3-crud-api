import { User } from '../users/InMemoryDb';
import { Utils } from '../utils';

const getAll = async (_req: any, res: any) => {
  try {
    const users = await User.findAll();

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
  } catch (error) {
    console.log(error);
  }
};

const getById = async (_req: any, res: any, id: any) => {
  try {
    // @ts-ignore
    const uuidCorrect = await Utils.isUUID(id);

    if (!uuidCorrect) {
      throw new Error('[Error] Invalid ID');
    }

    const user = await User.findById(id);

    if (!user) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(JSON.stringify({ message: 'User Not Found' })));
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(user));
    }
  } catch (error) {
    console.log(error);
    res.writeHead(400, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ message: `[Error] Invalid ID` }));
  }
};

const create = async (req: any, res: any) => {
  try {
    const body = await Utils.getPostData(req);

    // @ts-ignore
    const { username, age, hobbies } = JSON.parse(body);

    if (username && age && hobbies) {
      const user = {
        username,
        age,
        hobbies,
      };

      // @ts-ignore
      const newUser = await User.create(user);

      res.writeHead(201, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify(newUser));
    }

    throw new Error('[Error] Wrong input');
  } catch (error) {
    console.log(error);
    res.writeHead(400, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ message: `[Error] Wrong input` }));
  }
};

const update = async (req: any, res: any, id: string) => {
  try {
    // @ts-ignore
    const uuidCorrect = await Utils.isUUID(id);

    if (!uuidCorrect) {
      throw new Error('[Error] Invalid ID');
    }

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
      const updUser = await User.update(id, userData);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(updUser));
    }
  } catch (error) {
    console.log(error);
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: `[Error] Invalid ID` }));
  }
};

const remove = async (_req: any, res: any, id: any) => {
  try {
    // @ts-ignore
    const uuidCorrect = await Utils.isUUID(id);

    if (!uuidCorrect) {
      throw new Error('[Error] Invalid ID');
    }

    const user = await User.findById(id);

    if (!user) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(JSON.stringify({ message: 'User Not Found' })));
    } else {
      await User.remove(id);
      // console.log('WTF 1');
      // res.writeHead(204, { 'Content-Type': 'application/json' });
      // console.log('WTF 2');
      // res.end(JSON.stringify({ message: `User ${id} removed` }));
      // console.log('WTF 3');
      res.writeHead(204, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: `User ${id} removed` }));
    }
  } catch (error) {
    console.log(error);
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: `[Error] Invalid ID` }));
  }
};

export const Controller = {
  getAll,
  getById,
  create,
  update,
  remove,
};
