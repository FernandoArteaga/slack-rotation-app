import { bot, db } from "../index";
import { CreateShift, Shift } from "../typing/shifts";
import { logger } from "firebase-functions";

const shiftCollection = 'shifts'
export async function saveShift(createShift: CreateShift) {
  try {
    let groupName
    if (createShift.createUserGroup) {
      groupName = createShift.name.toLowerCase().trim().replace(/\s+/g, "-")
      await bot.usergroups.create({
        name: groupName
      })
    }
    const shift: Shift = {
      name: createShift.name,
      users: createShift.users,
      group: groupName
    }
    await db.collection(shiftCollection).add(shift)
  } catch (e) {
    logger.error("Error creating shift rotation", e)
  }
}
