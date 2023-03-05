import * as functions from 'firebase-functions';
import { PubSub } from '@google-cloud/pubsub'
import { WebClient } from '@slack/web-api';
import requestValidator from './requestValidator';
import appHome from './blocks/appHome';

const REGION = 'us-east4'
const bot = new WebClient(process.env.SLACK_TOKEN);
const pubSubClient = new PubSub();

exports.events = functions.region(REGION).https.onRequest(async (request, response) => {
  requestValidator(request)

  const body = request.body

  functions.logger.info(body.type)
  functions.logger.info(body.event)

  const data = JSON.stringify(request.body);
  const dataBuffer = Buffer.from(data);

  await pubSubClient
    .topic(body.event.type)
    .publishMessage({data: dataBuffer});

  response.sendStatus(200)
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
      view: {
        type: 'home',
        blocks: appHome
      }
    })
  });