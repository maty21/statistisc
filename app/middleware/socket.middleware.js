import * as AT from 'constants/action-types';
import io from 'socket.io-client';
const API_URL = 'http://localhost:8091';
let graphqlIOClient = null;
let connected = false;
let socket = io(API_URL);
function _init() {
  socket.on('connect', () => {
    console.log(`connected...${socket.id}`);
    connected = true;
    //  socket.send('hi');
    // socket.emit('graphQl', _graphQLParser.query(`hello`))
  });
}

const success = (dispatch, payload, action) => {
  dispatch({
    type: action.payload.actionType,
    meta: action.meta,
    payload
  });
};

export const socketioMiddleware = ({ dispatch }) => (next) => (action) => {
  if (![AT.SEND_TERMINAL_INPUT, AT.SOCKET_INIT].includes(action.type)) {
    return next(action);
  }
  if (action.type === AT.SOCKET_INIT) {
    socket.on(action.payload.topic, (data) => {
      success(dispatch, data, action);
    });
  } else {
    setTimeout(() => {
      socket.emit(action.payload.topic, action.payload.data);
    }, 300);
  }
  return next(action);
};
