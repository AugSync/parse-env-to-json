# Parse env to json

Parse a .env file to json to be used as an object.

To convert an env file to json and be able to use it in your scripts, you only have to import `parse-env-to-json` and provide two simple parameters: `path` to be able to read the file and `envKeys` to know which keys are going to be extracted

`.env`

```env
# this is a comment
API_URL="www.api.com"
API_TOKEN="token"

# another comment
DB_NAME  =  "db-example"
I_DONNOT_WANT_THIS_ENV = "empty"

DB_PASSWORD="password"
```

`index.js`

```js
const parseEnvToJson = require('parse-env-to-json');

const envFilePath = './.env';

async function readEnvFile() {
  const envKeysExtracted = await parseEnvToJson(envFilePath, [
    'API_URL',
    'API_TOKEN',
    'DB_NAME',
    'DB_PASSWORD',
  ]);

  console.log(envKeysExtracted);
  /* output: {
  *   apiUrl: 'www.api.com',
  *   apiToken: 'token',
  *   dbName: 'db-example',
  *   dbPassword: 'password',
    }*/

  return envKeysExtracted;
}

readEnvFile();
```
