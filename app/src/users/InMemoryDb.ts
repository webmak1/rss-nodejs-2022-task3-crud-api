import { IUser } from 'users/user.model';
import { v4 as uuidv4 } from 'uuid';

let users: IUser[] = [];

const findAll = () => {
  return new Promise((resolve, _reject) => {
    resolve(users);
  });
};

const findById = (id: any) => {
  return new Promise((resolve, _reject) => {
    const user = users.find((p) => p.id === id);
    resolve(user);
  });
};

const create = (user: IUser) => {
  return new Promise((resolve, _reject) => {
    // @ts-ignore
    const newUser = { id: uuidv4(), ...user };
    users.push(newUser);
    resolve(newUser);
  });
};

const update = (id: string, user: IUser) => {
  return new Promise((resolve, _reject) => {
    const index = users.findIndex((p) => p.id === id);

    // @ts-ignore
    users[index] = { id, ...user };
    resolve(users[index]);
  });
};

const remove = (id: any) => {
  return new Promise((resolve, _reject) => {
    users = users.filter((p) => p.id !== id);
    resolve('User Deleted');
  });
};

export const User = {
  findAll,
  findById,
  create,
  update,
  remove,
};
