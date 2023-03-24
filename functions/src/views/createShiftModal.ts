import { ModalView } from "@slack/web-api";

const view: ModalView = {
  "type": "modal",
  "title": {
    "type": "plain_text",
    "text": "Create a Shift Rotation"
  },
  "close": {
    "type": "plain_text",
    "text": "Close"
  },
  "submit": {
    "type": "plain_text",
    "text": "🚀 Create"
  },
  "external_id": "create_shift_modal",
  "blocks": [
    {
      "type": "input",
      "block_id": "section_shift_name",
      "element": {
        "type": "plain_text_input",
        "action_id": "shift_name",
        "placeholder": {
          "type": "plain_text",
          "text": "e.g. The Watchtower"
        }
      },
      "label": {
        "type": "plain_text",
        "text": "Shift name"
      }
    },
    {
      "type": "section",
      "block_id": "section_create_user_group",
      "text": {
        "type": "plain_text",
        "text": " "
      },
      "accessory": {
        "type": "checkboxes",
        "action_id": "create_user_group",
        "options": [
          {
            "text": {
              "type": "plain_text",
              "text": "Create a user group?"
            },
            "description": {
              "type": "plain_text",
              "text": "A user group will be automatically created (e.g. @the-watchtower) to easily mention the person on call."
            }
          }
        ]
      }
    },
    {
      "type": "input",
      "block_id": "section_rotation_users",
      "element": {
        "type": "multi_users_select",
        "placeholder": {
          "type": "plain_text",
          "text": "Select users",
          "emoji": true
        },
        "action_id": "rotation_users"
      },
      "label": {
        "type": "plain_text",
        "text": "The users to include in the rotation",
        "emoji": true
      }
    },
    {
      "type": "divider"
    },
    {
      "type": "header",
      "text": {
        "type": "plain_text",
        "text": "Rotation interval",
        "emoji": true
      }
    },
    {
      "type": "section",
      "block_id": "section_rotation_frequency",
      "text": {
        "type": "mrkdwn",
        "text": "Frequency"
      },
      "accessory": {
        "type": "static_select",
        "placeholder": {
          "type": "plain_text",
          "text": "Select an item",
          "emoji": true
        },
        "options": [
          {
            "text": {
              "type": "plain_text",
              "text": "Day",
              "emoji": true
            },
            "value": "daily"
          },
          {
            "text": {
              "type": "plain_text",
              "text": "Weekly",
              "emoji": true
            },
            "value": "weekly"
          },
          {
            "text": {
              "type": "plain_text",
              "text": "Monthly",
              "emoji": true
            },
            "value": "montlhy"
          }
        ],
        "action_id": "rotation_frequency"
      }
    }
  ]
}

export default view