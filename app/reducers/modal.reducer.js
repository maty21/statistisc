import { handleActions } from 'redux-actions';
import Immutable from 'seamless-immutable';
import actions from './../actions/actions';





const initState = {
  payload: {
    visible: false,
    data: null,
    component: null
  }
  // columns
};


const inititalState = Immutable.from(initState);

export default handleActions({
  [actions.OPEN_MODAL](state, {type, payload, meta, error}) {
    return state.merge(state, { payload });
  }

}, inititalState);
