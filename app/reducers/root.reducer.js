import { combineReducers } from 'redux';
import layers from './layers.reducer';
import containerTable from './conatainerTable.reducer';
import ui from './ui.reducer';
const rootReducer = combineReducers({ ui, layers, containerTable });
export default rootReducer;
