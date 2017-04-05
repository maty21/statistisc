import actions from './../actions/actions';

export function addCrumb(layer, value) {
  return {
    type: actions.ADD_CRUMB,
    payload: { layer, value }
  };
}

export function removeCrumb(layer, value) {
  return {
    type: actions.REMOVE_CRUMB,
    payload: { layer, value }
  };
}
