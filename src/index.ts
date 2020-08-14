const { readFile } = require('fs');
const { find, camelCase, findIndex } = require('lodash');

const deleteSpacingRegex = /\s/g;

interface paramsRequires {
  (path: string, envKeys: string[]): object;
}

/**
 * extract all lines of a text to array
 *
 * @param {string} text complete text to split into array
 * @returns {string[]} all lines
 */
function extractLines(text: string): string[] {
  return text
    .split(/\r\n|\n/) // split lines
    .filter(
      (line: string) =>
        line.replace(deleteSpacingRegex, '') !== '' && // delete white spaces
        !line.replace(deleteSpacingRegex, '').includes('#') // delete comments
    )
    .map((line: string) => line.replace('=', ':'));
}

/**
 * know if a env key is include in a line of env file
 *
 * @param {string[]} allLines lines of env files
 * @param {string} envKey env key
 * @returns if is included
 */
function isKeysIncluded(allLines: string[], envKey: string): boolean {
  return findIndex(allLines, (line: string) => line.includes(envKey)) > -1;
}

/**
 * extract only the value of @envKey param from @allLines
 *
 * @param {string[]} allLines lines of env files
 * @param {string} envKey env key
 * @returns {string} value
 */
function extractOnlyValue(allLines: string[], envKey: string): string {
  return find(allLines, (line: string) => line.includes(envKey))
    .replace(envKey, '')
    .replace(deleteSpacingRegex, '')
    .replace(':', '')
    .match(/"([^"]+)"/)[1]; // delete quotes
}

/**
 * Read env file and parse to json
 *
 * @param {*} path path of env file
 * @param {*} envKeys keys to extract from env file
 * @returns {object} environments keys in a object
 */
const parseEnvFileToJson: paramsRequires = (path, envKeys) => {
  return new Promise((resolve, reject) => {
    readFile(path, 'utf8', (err: Error, env: string) => {
      if (err) reject(err);

      const allLines = extractLines(env);

      const environmentsParsed = envKeys.reduce((envJson, envKey) => {
        const isIncluded = isKeysIncluded(allLines, envKey);

        if (isIncluded) {
          const value = extractOnlyValue(allLines, envKey);

          return { ...envJson, [camelCase(envKey)]: value };
        }

        return envJson;
      }, {});

      resolve(environmentsParsed);
    });
  });
};

module.exports = parseEnvFileToJson;
module.exports.extractLines = extractLines;
module.exports.isKeysIncluded = isKeysIncluded;
module.exports.extractOnlyValue = extractOnlyValue;
