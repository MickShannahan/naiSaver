import { logger } from "../utils/Logger.js"

const regSplit = /,|, /ig

export class Prompt {
  constructor(data, rawBody = null) {
    this.rawBody = rawBody
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
    if (rawBody || data.rawBody) this.convertBody(rawBody || data.rawBody)
    this.seedId = this.name + this.seed
    this.positiveTags = this.convertTags(this.positive)
    this.negativeTags = this.convertTags(this.negative)
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

  convertTags(prompt) {
    let tags = prompt.split(regSplit)
    // TODO more
    return tags
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
    try {
      let first = body.slice(body.indexOf('Size: ') + 6)
      if (first.includes(',')) {
        first = first.slice(0, first.indexOf(','))
      }
      this.width = parseInt(first.slice(0, first.indexOf('x')))
      this.height = parseInt(first.slice(first.indexOf('x') + 1))
      return true
    } catch (error) {
      logger.log(error)
    }
  }

  SetFirstPass(body) {
    let first = body.slice(body.indexOf('First pass size: ') + 17)
    if (first.includes(',')) {
      first = first.slice(0, first.indexOf(','))
    }
    this.firstWidth = parseInt(first.slice(0, first.indexOf('x')))
    this.firstHeight = parseInt(first.slice(first.indexOf('x') + 1))
    return true
  }
}


