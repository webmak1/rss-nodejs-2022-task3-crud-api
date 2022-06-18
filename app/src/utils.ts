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
  getPostData,
};
