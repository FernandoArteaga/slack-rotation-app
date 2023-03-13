import { BlockCheckboxOption, BlockType } from "./viewSubmissions";


export interface ShiftModalValues {
  'section-shift-name': {
    'shift-name': {
      type: BlockType
      value: string
    }
  }
  'section-create-user-group': {
    'create-user-group': {
      type: BlockType
      selected_options: BlockCheckboxOption[]
    }
  }
}

export interface ShiftModalErrors {
  'section-shift-name'?: string
}

export interface CreateShift {

}