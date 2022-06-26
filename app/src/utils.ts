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

const isUUID = (id: any) => {
  // UUID
  const regexExp =
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

  return new Promise((resolve, _reject) => {
    const res = regexExp.test(id);
    resolve(res);
  });
};

// const checkUUID = (id: any) => {

//   new Promise((resolve, reject) => {
//     regexExp.test(id) ? resolve(true) : reject(false);
//   });
// };

// const isUUID = async (id: any) => {
//   try {
//     return await checkUUID(id);
//   } catch (error) {
//     return false;
//   }
// };

export const Utils = {
  getPostData,
  isUUID,
};
