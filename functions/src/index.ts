import * as functions from 'firebase-functions';
import { PubSub } from '@google-cloud/pubsub'
import { WebClient } from '@slack/web-api';
import requestValidator from './handlers/requestValidator';
import appHome from './views/appHome';
import blockActionsHandler from './handlers/blockActions';
import viewSubmissionsHandler from './handlers/viewSubmissions';

const REGION = 'us-east4'
export const pubSubClient = new PubSub();
export const bot = new WebClient(process.env.SLACK_TOKEN);

exports.events = functions.region(REGION).https.onRequest(async (request, response) => {
  requestValidator(request)

  // For answering the challenge any time the Events URL changes
  // const { challenge } = request.body
  // response.send({challenge})

  const body = request.body

  functions.logger.info(`Event type ${body.event.type}`, body.event)

  const data = JSON.stringify(request.body);
  const dataBuffer = Buffer.from(data);

  await pubSubClient
    .topic(body.event.type)
    .publishMessage({data: dataBuffer});

  response.sendStatus(200)
});

exports.interactions = functions.region(REGION).https.onRequest(async (request, response) => {
  requestValidator(request)

  const body = request.body.payload
  const { type, view } = JSON.parse(body);

  functions.logger.info(`Interaction type --> ${type}`)

  if (type === 'block_actions') {
    const dataBuffer = Buffer.from(body);

    await pubSubClient
      .topic('block_actions')
      .publishMessage({data: dataBuffer});

    response.sendStatus(200)
  }

  if (type === 'view_submission') {
    await viewSubmissionsHandler(response, view)
  }
});

exports.eventAppMention = functions.region(REGION).pubsub
  .topic('app_mention')
  .onPublish(async (message) => {
    const { event } = message.json;
    const { channel, text } = event;

    await bot.chat.postMessage({
      channel: channel,
      text: `You just said: "${ text }"`
    })
  });

exports.eventAppHomeOpened = functions.region(REGION).pubsub
  .topic('app_home_opened')
  .onPublish(async (message) => {
    const { event } = message.json;
    const { user } = event;

    await bot.views.publish({
      user_id: user,
      view: appHome
    })
  });

exports.interactionsBlockHandler = functions.region(REGION).pubsub
  .topic('block_actions')
  .onPublish(async (message) => {
    const { trigger_id, actions } = message.json;

    await blockActionsHandler(trigger_id, actions)
  });

exports.createShift = functions.region(REGION).pubsub
  .topic('create_shift')
  .onPublish(async (message) => {
    const { trigger_id, actions } = message.json;

    await blockActionsHandler(trigger_id, actions)
  });