import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

const { PORT } = process.env;

export const CONFIG = {
  PORT,
};
