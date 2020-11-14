import crypto from 'crypto-js';


const salt = process.env.AES_SALT;

export const getCookie = (cookieName) => {
  const allCookies = document.cookie;
  console.log(allCookies);
  if (allCookies === '') {
    return allCookies;
  }

  const arrayOfCookies = allCookies.split('; ');
  const resultCookie = arrayOfCookies.filter((cookie) => cookie.startsWith(`${cookieName}`));

  return resultCookie;
};

export const encryptAES = (data, newSalt = salt) => crypto.AES.encrypt(data, newSalt).toString()
