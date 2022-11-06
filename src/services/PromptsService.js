import { AppState } from "../AppState.js"
import { Prompt } from "../models/Prompt.js"
import { saveState } from "../utils/Store.js"


class PromptsService {
  createPrompt(data) {
    let newPrompt = new Prompt(data, data.body)
    AppState.prompts.unshift(newPrompt)
    saveState('prompts', AppState.prompts)
  }
  deletePrompt(seedId) {
    AppState.prompts = AppState.prompts.filter(p => p.seedId != seedId)
    saveState('prompts', AppState.prompts)
  }
}

export const promptsService = new PromptsService()
