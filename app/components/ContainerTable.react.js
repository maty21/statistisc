// libs
import { Component } from 'react';
import 'antd/dist/antd.css';
import { connect } from 'react-redux';
import Immutable from 'seamless-immutable';
import { Table, Card, Icon, Tag, Button } from 'antd';
import ReactJson from 'react-json-view';
import { openModal } from '../actions/modal.action';
import { createSelector } from 'reselect';
import { Row, Col } from 'antd';
const ContainerTable = ({ dataSource, openModal }) => {
  const columns = [
    {
      title: 'PodName',
      dataIndex: 'podName',
      key: 'podName',
      onFilter: (value, record) => record.podName.includes(value),
      sorter: (a, b) => a.podName.length - b.podName.length
    },
    { title: 'Age', dataIndex: 'age', key: 'age' },
    { title: 'Address', dataIndex: 'address', key: 'address' },
    {
      title: 'Status',
      dataIndex: '',
      key: 'x',
      render: (text, record) => (
        <span>
          <Tag color="green">{record.podName}</Tag>
        </span>
      )
    },
    {
      title: 'Terminal',
      dataIndex: '',
      rowSpan: 2,
      key: 'y',
      render: (text, record) => (
        <Row type="flex" justify="left" align="middle">

          <Col span={3}>
            <Button icon="desktop" onClick={() => openModal(record, 'docker')}>
              Host
            </Button>
          </Col>
          <Col span={1}>
            <span className="ant-divider"/>

          </Col>
          <Col span={3}>
            <Button icon="laptop" onClick={() => openModal(record)}>
              Pod
            </Button>
          </Col>
          <Col span={1}>
            <span className="ant-divider"/>
          </Col>
          <Col span={3}>
            <Button icon="code-o" onClick={() => openModal(record)}>
              Log
            </Button>
          </Col>
          <Col span={1}>
            <span className="ant-divider"/>
          </Col>
          <Col span={3}>
            <Button icon="edit" onClick={() => openModal(record)}>
              Describe
            </Button>
          </Col>

          <Col span={5}/>
          {/* <Tag color="green">{record.podName}</Tag>*/}

        </Row>
      )
    }
  ];
  return (
    <div>
      <Table
        columns={columns}
        dataSource={dataSource.asMutable()}
        expandedRowRender={(record) => (
          <Card title="Card title">
            <ReactJson src={record}/>
          </Card>
        )}/>
    </div>
  );
};

const containerTable = (state) => state.containerTable.dataSource;
const autoCompleteFilter = (state) => state.autoCompleteFilter.filter;

const tableDataSelector = createSelector(
  containerTable,
  autoCompleteFilter,
  (containerTable, autoCompleteFilter) => {
    let returnData = containerTable;
    if (autoCompleteFilter != '') {
      returnData = containerTable.filter((row) =>
        Object.values(row).find((f) => f.toString().includes(autoCompleteFilter))
      );
    }
    return returnData;
  }
);

ContainerTable.propTypes = {
  // columns: React.PropTypes.array.isRequired,
  dataSource: React.PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  // columns: state.containerTable.columns,
  dataSource: tableDataSelector(state)
});

export default connect(mapStateToProps, { openModal })(ContainerTable);
