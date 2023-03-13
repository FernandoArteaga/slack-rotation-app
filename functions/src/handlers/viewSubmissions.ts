import { Response } from "firebase-functions";
import { ViewSubmission } from "../typing/viewSubmissions";
import { CreateShift, ShiftModalErrors, ShiftModalValues } from "../typing/shifts";
import { pubSubClient } from "../index";


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

  if (values['section-shift-name']['shift-name']['value'].length < 3) {
    errors['section-shift-name'] = 'Name is too short'
  }

  if (Object.keys(errors).length > 0) {
    response.send({
      "response_action": "errors",
      "errors": errors
    })
  } else {
    const createShift: CreateShift = {}
    const data = JSON.stringify(createShift);
    const dataBuffer = Buffer.from(data);

    await pubSubClient
      .topic('create_shift')
      .publishMessage({data: dataBuffer});
    response.send()
  }
}