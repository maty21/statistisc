import { combineReducers } from 'redux';
import layers from './layers.reducer';
import containerTable from './conatainerTable.reducer';
import modal from './modal.reducer';
import ui from './ui.reducer';
const rootReducer = combineReducers({ ui, layers, containerTable, modal });
export default rootReducer;



// WEBPACK FOOTER //
// ./reducers/root.reducer.js


// WEBPACK FOOTER //
// ./reducers/root.reducer.js