import { ModalView } from "@slack/web-api";

const view: ModalView = {
  type: 'modal',
  title: {
    "type": "plain_text",
    "text": "Create a Shift Rotation"
  },
  close: {
    "type": "plain_text",
    "text": "Close"
  },
  submit: {
    "type": "plain_text",
    "text": "🚀 Create"
  },
  external_id: 'create_shift_modal',
  blocks: [
    {
      "type": "input",
      "block_id": "section-shift-name",
      "element": {
        "type": "plain_text_input",
        "action_id": "shift-name",
        "placeholder": {
          "type": "plain_text",
          "text": "e.g. Watchtower"
        }
      },
      "label": {
        "type": "plain_text",
        "text": "Shift name"
      }
    },
    {
      "type": "section",
      "block_id": "section-create-user-group",
      "text": {
        "type": "plain_text",
        "text": " "
      },
      "accessory": {
        "type": "checkboxes",
        "action_id": "create-user-group",
        "options": [
          {
            "text": {
              "type": "plain_text",
              "text": "Create a user group?"
            },
            "description": {
              "type": "plain_text",
              "text": "A user group will be automatically created (e.g. @watchtower) to easily mention the person on call."
            },
          }
        ],
      }
    }
  ],
}

export default view