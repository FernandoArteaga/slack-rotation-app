import { Action } from '@slack/types';
import createShiftModal from '../views/createShiftModal';
import { bot } from '../index';

/**
 * It handles all the Block Actions interactions
 * @param {string} triggerID A short-lived ID that can be used to open modals.
 * @param {Action[]} [actions] Contains data from the specific interactive component that was used.
 */
export default async function handler(triggerID: string, actions?: Action[]) {
  if (actions) {
    for (const action of actions) {
      switch (action.action_id) {
        case 'create_shift':
          await bot.views.open({
            trigger_id: triggerID,
            view: createShiftModal
          })
          break
        case 'update_shift':
          break
        case 'delete_shift':
          break
      }
    }
  }
}