import { MessageHandler } from '../../utility';

export const AUTH_CONSTANTS = {
  INVALID_CREDENTIALS: new MessageHandler(401, 'INVALID CREDENTIALS'),
};
