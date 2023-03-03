# Slack Rotation App

Slack application for creating support rotations.

![Firebase](https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

## Requirements

- [NodeJS](https://nodejs.org/en/download/) >= v18
- [firebase-tools](https://firebase.google.com/docs/cli) >= v11
- Java JDK 11 or higher

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