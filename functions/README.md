# Cloud Functions

This directory contains all the source code use for the **Doodo's Cloud functions**.

The **Cloud Functions** are written in `TypeScript` and located inside the `./src` directory, and organized within
subdirectories

## Dependencies

Install dependencies with `npm`:

```bash
npm install
```

## Server

The function's code is loaded/watched by the **Firebase Emulator**, but since they are written in `TypeScript` we need
to convert them first to `JavaScript`

There 2 ways of building the code:

1. Just once, useful for testing the code 👉🏻`npm build`
2. On-change, useful for developing 👉🏻`npm run dev`

## The code