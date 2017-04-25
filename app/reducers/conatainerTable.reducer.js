import { handleActions } from 'redux-actions';
import Immutable from 'seamless-immutable';
import actions from '../constants/actions';



  const dataSource = [
    { key: 1, podName: 'John Brown', age: 32, address: 'New York No. 1 Lake Park', description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.' },
    { key: 2, podName: 'Jim Green', age: 42, address: 'London No. 1 Lake Park', description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.' },
    { key: 3, podName: 'Joe Black', age: 32, address: 'Sidney No. 1 Lake Park', description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.' },
  ];


const tmp = {
  dataSource
 // columns
};


const inititalState = Immutable.from(tmp);

export default handleActions({
  [actions.UPDATE_DATA](state, {type, payload, meta, error}) {
    return state.merge(payload);
  }

}, inititalState);
