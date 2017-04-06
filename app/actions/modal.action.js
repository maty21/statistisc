import actions from './../actions/actions';

export const openModal = (component, data) => ({
  type: actions.OPEN_MODAL,
  payload: { component, data, visible: true }
});


export const closeModal = () => ({
  type: actions.CLOSE_MODAL,
  payload: { visible: false, component: null, data: null }
});
