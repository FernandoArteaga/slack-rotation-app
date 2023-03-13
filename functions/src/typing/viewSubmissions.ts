import { ModalView } from "@slack/web-api";


export interface ViewSubmission<T> extends ModalView {
  id: string
  hash: string
  state: {
    values: T
  }
}

export type BlockType = 'plain_text_input' | 'checkboxes'

interface BlockCheckboxValues {
  type: string
  text: string
  emoji: boolean
}

export interface BlockCheckboxOption {
  text: BlockCheckboxValues
  description: BlockCheckboxValues
}