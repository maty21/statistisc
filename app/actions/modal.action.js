import actions from '../constants/actions';

export const openModal = (data, command) => ({
  type: actions.OPEN_MODAL,
  payload: { data, visible: true, command }
});

export const closeModal = () => ({
  type: actions.CLOSE_MODAL,
  payload: { visible: false, data: null, command: null }
});

// WEBPACK FOOTER //
// ./actions/modal.action.js

// WEBPACK FOOTER //
// ./actions/modal.action.js

// WEBPACK FOOTER //
// ./actions/modal.action.js

// WEBPACK FOOTER //
// ./actions/modal.action.js

// WEBPACK FOOTER //
// ./actions/modal.action.js

// WEBPACK FOOTER //
// ./actions/modal.action.js
