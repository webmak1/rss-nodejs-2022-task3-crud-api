import { v4 as uuidv4 } from 'uuid';

export interface IUser {
  id: string;
  username: string;
  age: string;
  hobbies: string;
}

export class User implements IUser {
  public id;
  public username;
  public age;
  public hobbies;

  constructor({ id = uuidv4(), username, age, hobbies }: IUser) {
    this.id = id;
    this.username = username;
    this.age = age;
    this.hobbies = hobbies;
  }
}
