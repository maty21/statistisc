import actions from '../constants/actions';
import topics from '../constants/topics';

export const init = () => ({
  type: actions.SOCKET_INIT,
  payload: {
    topic: topics.SEND_SERVER_TO_TERMINAL,
    actionType: actions.SOCKET_RECIVING_TERMINAL_FROM_SERVER
  }
});

export const emit = ({ data }) => ({
  type: actions.SEND_TERMINAL_INPUT,
  payload: { topic: topics.SEND_TERMINAL_TO_SERVER, data }
});
