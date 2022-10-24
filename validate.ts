import { TokenList, schema } from '@uniswap/token-lists'
import Ajv  from 'ajv'
import { readFileSync } from 'fs';
import addFormats from 'ajv-formats'



async function validate() {
  const ajv = new Ajv({ allErrors: true, verbose: true })
  addFormats(ajv)
  const validator = ajv.compile(schema);
  const data: TokenList = JSON.parse(readFileSync('./mainnet.tokenlist.json', 'utf-8'));
  const valid = validator(data)
  if (valid) {
    return valid
  }
  if (validator.errors) {
    throw validator.errors.map(error => {
      delete error.data
      return error
    })
  }
}

validate()
  .then(() => {
    console.log("Valid List.")
  })
  .catch((e) => {
    console.error(e)
  })