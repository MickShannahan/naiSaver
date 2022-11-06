import axios from "axios";
import { logger } from '../utils/Logger.js';

let unblob = axios.create({
  baseURL: 'https://unsandbox.onrender.com',
  timeout: 90000,
})
class BlobsService {

  async upload(file) {
    let data = await _convertToBlob(file)
    logger.log('formData', data)
    const res = await unblob.post('api/blobs?container=prompter', data)
    logger.log(res.data)
    return res.data.url
  }

}

async function _convertToBlob(raw) {
  let data = new FormData()
  data.append('file', raw, raw.name)
  return data
}

export const blobsService = new BlobsService()
