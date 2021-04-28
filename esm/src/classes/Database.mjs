import fetch from 'node-fetch';
import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

import constants from '../utils/constants.mjs';

function hash(value, salt) {
  const hashItem = crypto.createHmac('sha512', salt);
  hashItem.update(value);
  const result = hashItem.digest('hex');
  return {
    salt,
    hashedpassword: result,
  };
}

function compare(value, hashData) {
  const resultData = hash(value, hashData.salt);
  if (resultData.hashedpassword === hashData.hashedpassword) {
    return true;
  }
  return false;
}

let exportable;

if (constants.initVariables.experimentalFeatures) {
  exportable = class Database {
    constructor(dbToken, salt = '', options = {}) {
      if (!process.env.REPLIT_DB_URL) throw new Error('Please run the Database Class on a Replit Project only.');

      this.dbToken = dbToken || process.env.REPLIT_DB_URL;
      this.salt = salt;
      this.options = {
        id: String(dbToken).split('/')[4] || process.env.REPLIT_DB_URL.split('/')[4],
        owner: process.env.REPL_OWNER,
        collaborators: { ...options.collaborators },
        password: { ...hash(String(options.password), String(salt)) },
        type: options.type,
        encrypted: options.encrypted || [false],
        'max-items': options['max-items'] || 10,
      };
    }

    async init() {
      const isDatabaseSetup = await fetch(`${this.dbToken}/${encodeURIComponent('replapi_database_config')}`, {
        method: 'GET',
      }).then((res) => res.text());

      if (!isDatabaseSetup) {
        if (this.options.type === 'plus') {
          let createDatabaseFlag;
          if (fs.existsSync(path.join(process.cwd(), '.replapirc.json'))) {
            createDatabaseFlag = JSON.parse(fs.readFileSync(path.join(process.cwd(), '.replapirc.json'))).createDatabaseFlag;
          }

          if (createDatabaseFlag) {
            const info = await fetch(`${this.dbToken}`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
              body: `${encodeURIComponent('replapi_database_config')}=${encodeURIComponent(JSON.stringify({ ...this.options }))}`,
            });
          } else {
            throw new Error('Are you sure you want to use these options to configure a Database? You will not be able to change these options in the future. If you are, then in your .replapirc.json file set a "createDatabaseFlag" key to "true". For more information, read the documentation.');
          }
        } else if (this.options.type === 'repldb') {
          const info = await fetch(`${this.dbToken}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `${encodeURIComponent('replapi_database_config')}=${encodeURIComponent(JSON.stringify({ ...this.options }))}`,
          });
        } else {
          throw new Error('Invalid Database Type. For a normal database, use the "repldb" option.');
        }
      }
    }

    async createCollection(collectionName) {
      const info = await fetch(`${this.dbToken}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `${encodeURIComponent(collectionName)}=${encodeURIComponent(JSON.stringify({}))}`,
      });
    }

    async createDoc(collectionName, docName, docItems) {
      const collection = await this.getCollection(collectionName);
      collection[docName] = { ...docItems };

      const info = await fetch(`${this.dbToken}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `${encodeURIComponent(collectionName)}=${encodeURIComponent(JSON.stringify(collection))}`,
      });
    }

    async getCollection(collectionName) {
      const info = await fetch(`${this.dbToken}/${collectionName}`, {
        method: 'GET',
      }).then((res) => res.json());

      return info;
    }

    async getDoc(collectionName, docName) {
      const info = await fetch(`${this.dbToken}/${collectionName}`, {
        method: 'GET',
      }).then((res) => res.json());

      return info[docName];
    }

    async updateDoc(collectionName, docName, docItems) {
      const collection = await this.getCollection(collectionName);
      _.assignIn(collection[docName], docItems);

      const info = await fetch(`${this.dbToken}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `${encodeURIComponent(collectionName)}=${encodeURIComponent(JSON.stringify(collection))}`,
      });
    }

    async delete(key) {
      const info = await fetch(`https://kv.replit.com/v0/${this.replitdbtoken}/${key}`, {
        method: 'GET',
        headers,
      }).then((res) => res.json());
    }
  };
} else {
  exportable = function noExperimentalFeatures() {
    console.log('Experimental Features are not enabled. To learn more about experimental features please visit the documentation.');
  };
}

export default exportable;