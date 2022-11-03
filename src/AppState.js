import { reactive } from 'vue'
import { Prompt } from './models/Prompt.js'
import { loadState } from './utils/Store.js'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {},

  /** @type {import('./models/Prompt.js').Prompt[]} */
  prompts: loadState('prompts', [Prompt]),

  /** @type {import('./models/Prompt.js').Prompt} */
  activePrompt: {}
})
