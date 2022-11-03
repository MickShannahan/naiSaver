import { AppState } from "../AppState.js"
import { Prompt } from "../models/Prompt.js"
import { saveState } from "../utils/Store.js"


class PromptsService {
  createPrompt(data) {
    let newPrompt = new Prompt(data, data.body)
    AppState.prompts.unshift(newPrompt)
    saveState('prompts', AppState.prompts)
  }
  deletePrompt() {

  }
}

export const promptsService = new PromptsService()
