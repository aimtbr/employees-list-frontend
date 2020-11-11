import config from 'config';
import crypto from 'crypto-js';


const salt = config.get('saltAES');

export const getCookie = (cookieName) => {
  const allCookies = document.cookie;

  if (allCookies === '') {
    return allCookies;
  }

  const arrayOfCookies = allCookies.split('; ');
  const resultCookie = arrayOfCookies.filter((cookie) => cookie.startsWith(`${cookieName}`));

  return resultCookie;
};

export const encryptAES = (data, newSalt = salt) => crypto.AES.encrypt(data, newSalt).toString()
