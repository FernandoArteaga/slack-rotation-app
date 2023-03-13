import { createHmac } from 'crypto';
import { Request } from 'firebase-functions/lib/common/providers/https';
import { logger, https } from 'firebase-functions';

/**
 * Validates the requests from Slack
 * @param {Request} request
 */
export default function validate(request: Request): void {
  const slackSigningSecret = process.env.SLACK_SIGNING_SECRET

  if (!slackSigningSecret) {
    throw new Error('No SLACK_SIGNING_SECRET configured');
  }

  const timestamp = request.headers['x-slack-request-timestamp'];
  const signature = request.headers['x-slack-signature'] as string;
  const requestBody = request.rawBody;

  if (!signature) {
    throw new https.HttpsError('permission-denied', 'Unauthorized');
  }

  const hmac = createHmac('sha256', slackSigningSecret);
  const [version, hash] = signature.split('=');
  const baseString = `${version}:${timestamp}:${requestBody}`;
  const computedHash = hmac.update(baseString).digest('hex');

  if (hash !== computedHash) {
    logger.error('Invalid request signature');
    throw new https.HttpsError('permission-denied', 'Unauthorized');
  }

  return
}
