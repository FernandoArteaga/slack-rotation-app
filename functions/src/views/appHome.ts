import { HomeView } from "@slack/web-api";

const view: HomeView = {
  type: 'home',
  blocks: [
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": "You can use *Shift Rotations* to manage user's group :arrows_counterclockwise: rotations on a given :hash:channel."
      }
    },
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": "The rotation will occur on a specific :date: and :clock1:, assigning the user on duty to a specific group."
      }
    },
    {
      "type": "actions",
      "elements": [
        {
          "type": "button",
          "text": {
            "type": "plain_text",
            "text": "➕ Create rotation",
            "emoji": true
          },
          "action_id": "create_shift",
          "style": "primary"
        }
      ]
    }
  ]
}

export default view