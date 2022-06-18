import * as fs from 'fs';

const writeDataToFile = (filename: any, content: any) => {
  // @ts-ignore
  fs.writeFileSync(filename, JSON.stringify(content), 'utf8', (err) => {
    if (err) {
      console.log(err);
    }
  });
};

const getPostData = (req: any) => {
  return new Promise((resolve, reject) => {
    try {
      let body = '';

      req.on('data', (chunk: any) => {
        body += chunk.toString();
      });

      req.on('end', () => {
        resolve(body);
      });
    } catch (error) {
      reject(error);
    }
  });
};

export const Utils = {
  writeDataToFile,
  getPostData,
};
