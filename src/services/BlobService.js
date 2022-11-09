import axios from "axios";
import { logger } from '../utils/Logger.js';

// let unblob = axios.create({
//   baseURL: 'https://unsandbox.onrender.com',
//   timeout: 90000,
// })
let unblob = axios.create({
  baseURL: 'https://blobber.azurewibsites.net/',
  timeout: 90000,
})
class BlobsService {

  async upload(file) {
    let data = await _convertToBlob(file)
    logger.log('formData', data)
    const res = await unblob.post('api/blobber?container=prompter&fileName=' + file.name.slice(0, file.name.indexOf('.')), data)
    logger.log(res.data)
    return res.data.url
  }

}

async function _convertToBlob(raw) {
  let data = new FormData()
  data.append('file', raw, raw.name)
  return data
}

async function blur() {

}

export const blobsService = new BlobsService()
