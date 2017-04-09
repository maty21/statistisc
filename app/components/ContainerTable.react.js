// libs
import { Component } from 'react';
import 'antd/dist/antd.css';
import { connect } from 'react-redux';
import Immutable from 'seamless-immutable';
import { Table, Card, Icon, Tag, Button } from 'antd';
import ReactJson from 'react-json-view';
import { openModal } from '../actions/modal.action';
// components



//  selectors
// const style = {
//   overflowY: "scroll"
// };
const ContainerTable = ({ dataSource, openModal  }) => {
  const columns = [
    {
      title: 'PodName', dataIndex: 'podName', key: 'podName',
      onFilter: (value, record) => record.podName.includes(value),
      sorter: (a, b) => a.podName.length - b.podName.length,
      // sortOrder: 'descend'
    },
    { title: 'Age', dataIndex: 'age', key: 'age' },
    { title: 'Address', dataIndex: 'address', key: 'address' },
    {
      title: 'Status', dataIndex: '', key: 'x', render: (text, record) => (
        <span>
          <Tag color="green">{record.podName}</Tag>
        </span>
      )
    },
    {
      title: 'Terminal', dataIndex: '', key: 'y', render: (text, record) => (
        <span>
          <Button shape="circle" icon="desktop" onClick={() =>
            openModal(record)
          } />
          {/*<Tag color="green">{record.podName}</Tag>*/}
        </span>
      )
    }

  ];
  return (
    <div >
      <Table columns={columns} dataSource={dataSource.asMutable()} expandedRowRender={record =>
        <Card title="Card title">
          <ReactJson src={record} />
        </Card>} />
    </div>
  )
}




ContainerTable.propTypes = {
  // columns: React.PropTypes.array.isRequired,
  dataSource: React.PropTypes.array.isRequired

};



const mapStateToProps = (state) => (
  {
    //columns: state.containerTable.columns,
    dataSource: state.containerTable.dataSource

  }
);

export default connect(mapStateToProps, { openModal })(ContainerTable);



// WEBPACK FOOTER //
// ./components/ContainerTable.react.js


// WEBPACK FOOTER //
// ./components/ContainerTable.react.js


// WEBPACK FOOTER //
// ./components/ContainerTable.react.js