import { MessageHandler } from '../../utility';

export const USER_CONSTANTS = {
  EXISTS: new MessageHandler(400, 'USER ALREADY EXISTS'),
  CREATED: new MessageHandler(201, 'USER CREATED SUCCESSFULLY'),
  NOT_FOUND: new MessageHandler(404, 'USER NOT FOUND'),
};
