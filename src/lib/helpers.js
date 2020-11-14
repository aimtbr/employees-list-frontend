import crypto from 'crypto-js';


const salt = process.env.AES_SALT;

export const getCookie = (cookieName) => {
  const allCookies = document.cookie;

  if (allCookies === '') {
    return allCookies;
  }

  const arrayOfCookies = allCookies.split('; ');
  const resultCookie = arrayOfCookies.filter((cookie) => cookie.startsWith(cookieName));

  return resultCookie;
};

export const deleteCookie = (cookieName) => {
  document.cookie = `${cookieName}=; max-age=-1`;
};

export const encryptAES = (data, newSalt = salt) => crypto.AES.encrypt(data, newSalt).toString();

export const formatDate = (date) => {
  let dateCopy = date;

  if (!(dateCopy instanceof Date)) {
    dateCopy = new Date(dateCopy);
  }

  return `${dateCopy.getDate()}.${dateCopy.getMonth() + 1}.${dateCopy.getFullYear()}`;
};

export const formatEmployeesDoc = (doc) => {
  const { _id: id, dateAdded, ...rest } = doc;

  const dateAddedWrapped = new Date(dateAdded);

  const formattedDoc = {
    ...rest,
    id,
    dateAdded: dateAddedWrapped,
  };

  return formattedDoc;
};