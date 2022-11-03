import { logger } from "../utils/Logger.js"


export class Prompt {
  constructor(data, rawBody = null) {
    this.name = data.name
    this.img = data.img
    this.positive = data.positive
    this.negative = data.negative
    this.sampler = data.sampler
    this.steps = data.steps || 28
    this.seed = data.seed || -1
    this.cfg = data.cfg || 10
    this.height = data.height || 512
    this.width = data.width || 512
    this.highResFix = data.highResFix || false
    this.denoise = data.denoise || 0.6
    this.firstHeight = data.firstHeight
    this.firstWidth = data.firstWidth
    this.extras = data.extras
    this.favorite = data.favorite || false
    if (rawBody) this.convertBody(rawBody)
    logger.log(this)
  }

  convertBody(body) {
    this.positive = this.PositivePrompt(body)
    this.negative = this.NegativePrompt(body)
    this.sampler = this.GetProperty(body, 'Sampler', 'CFG scale')
    this.steps = parseInt(this.GetProperty(body, 'Steps', 'Sampler'))
    this.cfg = parseFloat(this.GetProperty(body, 'CFG scale', 'Seed'))
    this.seed = parseInt(this.GetProperty(body, 'Seed', 'Size'))
    this.SetSize(body)
    if (body.includes('Denoising')) {
      this.highResFix = true
      this.denoise = parseFloat(this.GetProperty(body, 'Denoising strength', 'Clip skip'))
      this.SetFirstPass(body)
    }
  }

  PositivePrompt(body = '') {
    return body.slice(0, body.indexOf('Negative')).trim()
  }

  NegativePrompt(body = '') {
    return body.slice(body.indexOf('Negative prompt:') + 16, body.indexOf('Steps')).trim()
  }

  GetProperty(body, start, end) {
    return body.slice(body.indexOf(`${start}:`) + start.length + 2, body.indexOf(`, ${end}`))
  }

  SetSize(body) {
    let first = body.slice(body.indexOf('Size: ') + 6)
    let second = first.slice(0, first.indexOf(','))
    this.width = parseInt(second.slice(0, second.indexOf('x')))
    this.height = parseInt(second.slice(second.indexOf('x') + 1))
    return true
  }

  SetFirstPass(body) {
    let first = body.slice(body.indexOf('First pass size: ') + 18)
    let second = first.slice(0, first.indexOf(','))
    this.firstWidth = parseInt(second.slice(0, second.indexOf('x')))
    this.firstHeight = parseInt(second.slice(second.indexOf('x') + 1))
    return true
  }
}

let test = `masterpiece, high res, sfw, soft lighting, perfect face, selfie, elf, long hair, pink hair, full lips, thick lips, pink eyes, long eyelashes, no bangs, squinting, curvy, snap - back hat, pink yoga pants, wide hips.thick thighs, hoodie, instagram, snapchat, taut clothing, smug, street scene, raytracing
Negative prompt: lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry, artist name
Steps: 45, Sampler: Euler a, CFG scale: 11, Seed: 4278107481, Size: 768x768, Model hash: 925997e9, Denoising strength: 0.6, Clip skip: 2, ENSD: 31337, First pass size: 0x0`

