import { handleActions } from 'redux-actions';
import Immutable from 'seamless-immutable';
import actions from '../constants/actions';
import topics  from '../constants/topics';




const initState = {
  data: null,

  // columns
};


const inititalState = Immutable.from(initState);

export default handleActions({
  [actions.SOCKET_RECIVING_TERMINAL_FROM_SERVER](state, {type, payload, meta, error}) {
    return Immutable(payload);
  },
  [actions.CLEAR_CLIENT_TERMINAL](state, {type, payload, meta, error}) {
    return Immutable(payload);
    
  }

}, inititalState);

