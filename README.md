# Slack Rotation App

Slack application for creating support rotations.

![Firebase](https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

[![Deploy Firebase Functions](https://github.com/FernandoArteaga/slack-rotation-app/actions/workflows/deploy-firebase-functions.yml/badge.svg)](https://github.com/FernandoArteaga/slack-rotation-app/actions/workflows/deploy-firebase-functions.yml)

## Requirements

- [NodeJS](https://nodejs.org/en/download/) >= v18
- [firebase-tools](https://firebase.google.com/docs/cli) >= v11
- Java JDK 11 or higher
- [ngrok](https://ngrok.com/download) (optional), for local [development](#development) only.

### macOS

For installing `firebase-tools`

```bash
npm install -g firebase-tools
```

### Login into Firebase

Authenticate into Firebase using the Firebase CLI

```bash
firebase login
```


## The code

This repository contains different files and directories that are part of the entire Firebase stack. Here is a brief
description of the most important files to take into account

### Firebase Emulator

The **Firebase Emulator** will be used for local development.

#### Setup

Create a `./data` directory for exporting data from the Emulator and storing it locally. Note that this directory is ignored

```bash
make emulator-setup
```

#### Run Emulator

Start the **Firebase Emulator** by running the command below. This will ensure to locally start all the [emulators](#project-emulators)
configured in the `firebase.json` file.

This will also export all the data when the Emulator stops

```bash
make emulator-start
```

#### Save data

The data can be saved at any moment just by running

```bash
make emulator-export
```

#### Project Emulators

| Emulator        | Port |
|-----------------|------|
| UI              | 9090 |
| Cloud Functions | 9098 |
| Firestore       | 9097 |
| Pub/Sub         | 9096 |
| Eventarc        | 9094 |


### Cloud Functions

The source code for the `Cloud Functions` is located inside the `./functions` folder, along with [detailed documentation](functions/README.md)
about them

### Firestore

#### Rules

The **Firestore** rules are handled inside the `./firestore.rules` file

**Important:** Be careful when editing this file, any carelessness can lead to unwanted manipulation or leakage of information.

#### Indexes

The **Firestore** indexes are handled inside the `./firestore.indexes.json` file


## Slack App

### OAuth & Permissions

Configure the following [Scopes](https://api.slack.com/scopes) for the app:

* [chat:write](https://api.slack.com/scopes/chat:write)
* [usergroups:write](https://api.slack.com/scopes/usergroups:write)

### App Home

Enable the **Home Tab** and **Messages Tab** from the **Show Tabs** section in the [App Home](https://api.slack.com/apps/A04S6725AHZ/app-home?)
page

### Event Subscriptions

Enable the [Event Subscriptions](https://api.slack.com/apis/connections/events-api) and configure the URL for the events.
It will be (if using Firebase) something like `https://<region>.<app-name>/events`

### Interactivity & Shortcuts

Enable the [Interactivity & Shortcuts](https://api.slack.com/messaging/interactivity#components) and configure the URL
for the interactivity. It will be (if using Firebase) something like `https://<region>.<app-name>/interactions`


## Development

For the local development the easiest thing is to use [ngrok](https://ngrok.com/), this will allow us to expose the
Firebase Emulator's functions and connect the Slack App with our local machine.

Basically start the ngrok tunnel and copy the output URL to configure the Slack App.

```bash
make ngrok-tunnel
```
