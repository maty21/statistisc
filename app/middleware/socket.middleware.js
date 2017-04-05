import io from 'socket.io-client'
import {
	handleActions
} from 'redux-actions';

const socketPrefix = { INCOMING: 'incoming', OUTGOING: 'outgoing' }
const INCOMING_SOCKET = 'INCOMING_SOCKET';
const OUTGOING_SOCKET = 'OUTGOING_SOCKET';
//add backend url to io ctor
let socket = new io('http://localhost:3000')

const socketMiddleware = ({ dipatch, state }) => next => action => {
  socket.on(socketPrefix.OUTGOING,(data)=>{
    dispatch({ type:OUTGOING_SOCKET+'_'+data.topic, payload:data } )
  })
	switch (action.type) {
	case INCOMING_SOCKET:
		socket.emit(socketPrefix.INCOMING + ':' + action.payload.topic, action.payload.data);
		return;
  case "INIT_OUTGOING_SOCKET":
      socket.on(action.payload.topicToRegister,(data)=>{
         dispatch(action.payload.actionToDispatch,data)
      })
	default:
		return null;
	}
	return next(action);
};

export socketMiddleware;
