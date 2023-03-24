import { BlockCheckboxOption } from "./viewSubmissions";


export interface ShiftModalValues {
  section_shift_name: {
    shift_name: {
      value: string
    }
  }
  section_create_user_group: {
    create_user_group: {
      selected_options: BlockCheckboxOption[]
    }
  }
  section_rotation_users: {
    rotation_users: {
      selected_users: string[]
    }
  }
}

export interface ShiftModalErrors {
  section_shift_name?: string
}

export interface CreateShift {
  name: string
  createUserGroup: boolean
  users: string[]
}

export interface Shift {
  name: string
  users: string[]
  group?: string
}