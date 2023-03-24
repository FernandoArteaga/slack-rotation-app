import { pubSubClient } from "../index";
import { logger, Response } from "firebase-functions";
import { ViewSubmission } from "../typing/viewSubmissions";
import { CreateShift, ShiftModalErrors, ShiftModalValues } from "../typing/shifts";


/**
 * It handles all the View Submissions interactions
 * @param {Response} response Firebase response object
 * @param {ViewSubmission} view A short-lived ID that can be used to open modals.
 */
export default async function handler(response: Response, view: ViewSubmission<any>) {
  switch (view.external_id) {
    case 'create_shift_modal':
      await createShiftValidator(response, view.state.values)
    break
  }
}

/**
 * Validates the modal state values
 */
async function createShiftValidator(response: Response, values: ShiftModalValues) {
  const errors: ShiftModalErrors = {}

  logger.info(values)

  if (values.section_shift_name.shift_name.value.length < 3) {
    errors.section_shift_name = 'Name is too short'
  }

  const isNameValid = /^[a-zA-Z0-9\s-]*$/.test(values.section_shift_name.shift_name.value)
  if (!isNameValid) {
    errors.section_shift_name = 'Name should only contain letters, numbers, spaces and hyphens (-)'
  }

  if (Object.keys(errors).length > 0) {
    response.send({
      "response_action": "errors",
      "errors": errors
    })
  } else {
    const createShift: CreateShift = {
      name: values.section_shift_name.shift_name.value,
      createUserGroup: values.section_create_user_group.create_user_group.selected_options.length > 0,
      users: values.section_rotation_users.rotation_users.selected_users,
    }

    const data = JSON.stringify(createShift);
    const dataBuffer = Buffer.from(data);

    await pubSubClient
      .topic('create_shift')
      .publishMessage({data: dataBuffer});
    response.send()
  }
}
