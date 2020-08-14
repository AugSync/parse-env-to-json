const path = require('path');
const parseEnvFileToJson = require('../index.ts');
const { extractLines, isKeysIncluded, extractOnlyValue } = require('../index.ts');

const { test, expect } = global;

const textToSplit = `
# this is a comment
API_URL="www.api.com"
API_TOKEN="token"

# another comment
DB_NAME  =  "db-example"
I_DONNOT_WANT_THIS_ENV = "empty"

DB_PASSWORD="password"`;

test('Extract all lines of a text', () => {
  const resultExpected = [
    'API_URL:"www.api.com"',
    'API_TOKEN:"token"',
    'DB_NAME  :  "db-example"',
    'I_DONNOT_WANT_THIS_ENV : "empty"',
    'DB_PASSWORD:"password"',
  ];

  expect(extractLines(textToSplit)).toStrictEqual(resultExpected);
});

test('Is Keys Included', () => {
  expect(isKeysIncluded(extractLines(textToSplit), 'API_URL')).toBe(true);
});

test('Extract Only Value', () => {
  expect(extractOnlyValue(extractLines(textToSplit), 'API_URL')).toBe('www.api.com');
});

test('Read and parse env file', () => {
  const envJson = {
    apiUrl: 'www.api.com',
    apiToken: 'token',
    dbName: 'db-example',
    dbPassword: 'password',
  };

  expect.assertions(1);

  return parseEnvFileToJson(path.join(__dirname, '../', '/__tests__/.env.test'), [
    'API_URL',
    'API_TOKEN',
    'DB_NAME',
    'DB_PASSWORD',
  ]).then((data) => expect(data).toMatchObject(envJson));
});
