// import { FlexRows, FlexColumns, AutoSize } from 'components/common/Flex.react';
import { connect } from 'react-redux';
import ContainerTable from './ContainerTable.react';
import TerminalModal from './TerminalModal.react';
import TableAutoComplete from './TableAutoComplete.react';
import { BackTop } from 'antd';
import { Layout, Menu, Icon } from 'antd';
import { Row, Col } from 'antd';
const { Header, Sider, Content } = Layout;

// eslint-disable-next-line
//react/prefer-stateless-function
let collapsedState = false;
let toggle = () => {
  collapsedState = !collapsedState;
};

const LayoutInner = (props) => (
  <Layout>
    <Header
      style={{
        background: '#4285f4',
        boxShadow: '5px 0 5px 0 rgba(0,0,0,0.7)',
        zIndex: '2 '
      }}>
      <Row type="flex" justify="start" align="middle">

        <Col span={10} offset={8}>
          <TableAutoComplete/>
        </Col>

      </Row>
    </Header>
    <Layout>
      <Sider
        style={{ background: '#ececec' }}
        trigger={null}
        collapsible
        collapsed={collapsedState}>
   
        <Menu
          style={{ background: '#ececec', marginTop: '25px' }}
          mode="inline"
          defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            <Icon type="user"/>
            <span className="nav-text">nav 1</span>
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="video-camera"/>
            <span className="nav-text">nav 2</span>
          </Menu.Item>
          <Menu.Item key="3">
            <Icon type="upload"/>
            <span className="nav-text">nav 3</span>
          </Menu.Item>
        </Menu>
      </Sider>
      <Content
        style={{
          boxShadow: '0px 0px 5px 0 rgba(0,0,0, 0.15)',
          margin: '24px 16px',
          padding: 24,
          background: '#fff',
          minHeight: '89vh'
        }}>
        <BackTop/>
        <ContainerTable/>
        <TerminalModal/>
      </Content>
    </Layout>
  </Layout>
);

/* <div>
  <BackTop />
  <ContainerTable/>
</div>*/

LayoutInner.propTypes = {
  children: React.PropTypes.node
};

export default LayoutInner;
