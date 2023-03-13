# Cloud Functions

This directory contains all the source code use for the **Slack Rotation App Cloud functions**.

The **Cloud Functions** are written in `TypeScript` and located inside the `./src` directory, and organized within
subdirectories

## Dependencies

Install dependencies with `npm`:

```bash
npm install
```

## Environment

There's no need to configure an `.env` file for local development, only if you plan to manually deploy the functions, 
**which is not recommended** since the function's deployments will be handled by the CI/CD.

In case of manually deploying the functions. Copy the `.env.example` file as `.env` and configure the environment variables.

```bash
cp .env.example .env
```

| Variable              | Description                                                                              |
|-----------------------|------------------------------------------------------------------------------------------|
| SLACK_TOKEN           | Get the Slack token from: `App Features -> OAuth & Permissions -> Bot User OAuth Token`  |
| SLACK_SIGNING_SECRET  | Get the Slack signing secret from: `App Settings -> Basic Information -> Signing Secret` |


## Server

The function's code is loaded/watched by the **Firebase Emulator**, but since they are written in `TypeScript` we need
to transcribe them first into `JavaScript`.

There 2 ways of building the code:

1. Just once, useful for testing the code 👉🏻`npm build`
2. On-changes, useful for developing 👉🏻`npm run dev`

## The code

Inside the `./src` directory:

* The `index.ts` is the application entry point, it contains all the declaration for the Cloud Functions.
* The `views` [directory](src/views) contains all the [Block Kits](https://api.slack.com/block-kit/building) used by the Slack App.
* The `handlers` [directory](src/handlers) contains helpers/handlers functions who take care of specific uses cases.
