import AT from '../constants/actions';
import io from 'socket.io-client';
import topics from '../constants/topics';
// const API_URL = `${window.location.origin}/api`;
const API_URL = 'http://www.localhost:8091/';
let graphqlIOClient = null;
let connected = false;
// let socket = io(API_URL,{path:'/api/socket.io'});
let socket = io(API_URL, { transports: ['websocket'] });

// function _init() {
socket.on('connect', () => {
  console.log(`connected...${socket.id}`);
  connected = true;
  //  socket.send('hi');
  // socket.emit('graphQl', _graphQLParser.query(`hello`))
});
// }

const success = (dispatch, payload, action) => {
  dispatch({
    type: action.payload.actionType,
    meta: action.meta,
    payload
  });
};

export const socketioMiddleware = ({ dispatch }) => (next) => (action) => {
  if (![AT.SEND_TERMINAL_INPUT, AT.SOCKET_INIT,].includes(action.type)) {
    return next(action);
  }
  if (action.type === AT.SOCKET_INIT) {
   // socket.emit(topics.OPEN_TERMINAL, { id: socket.id });
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
