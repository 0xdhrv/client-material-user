/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';

const SECRET_KEY = 'this-is-a-key';
const SecureStorage = require('secure-web-storage');
@Injectable()
export class StorageService {
  constructor() {}
  public secureStorage = new SecureStorage(localStorage, {
    hash: function hash(key: string | CryptoJS.lib.WordArray) {
      key = CryptoJS.SHA256(key, { SECRET_KEY });
      return key.toString();
    },
    encrypt: function encrypt(data: any) {
      data = CryptoJS.AES.encrypt(data, SECRET_KEY);
      data = data.toString();
      return data;
    },
    decrypt: function decrypt(data: any) {
      data = CryptoJS.AES.decrypt(data, SECRET_KEY);
      data = data.toString(CryptoJS.enc.Utf8);
      return data;
    }
  });
}
