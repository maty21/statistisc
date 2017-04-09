//import { FlexRows, FlexColumns, AutoSize } from 'components/common/Flex.react';
import { connect } from 'react-redux';
import ContainerTable from './ContainerTable.react';
import TerminalModal from './TerminalModal.react';
import { BackTop } from 'antd';
import { Layout, Menu, Icon } from 'antd';
const { Header, Sider, Content } = Layout;
// eslint-disable-next-line 
//react/prefer-stateless-function
let collapsedState = false;
let toggle = () => {
  collapsedState= !collapsedState;
}

const LayoutInner = (props) =>
  <Layout>
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsedState}>
      <div className="logo">
        <h3 style={{color:'white',paddingLeft:'10px',paddingTop:'20px',paddingBottom:'20px'}}>RMS Monitor</h3>
      </div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
        <Menu.Item key="1">
          <Icon type="user" />
          <span className="nav-text">nav 1</span>
        </Menu.Item>
        <Menu.Item key="2">
          <Icon type="video-camera" />
          <span className="nav-text">nav 2</span>
        </Menu.Item>
        <Menu.Item key="3">
          <Icon type="upload" />
          <span className="nav-text">nav 3</span>
        </Menu.Item>
      </Menu>
    </Sider>
    <Layout>
      
      <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: '95vh' }}>
        <BackTop />
        <ContainerTable/>
        <TerminalModal/>
      </Content>
    </Layout>
  </Layout>



/*<div>
  <BackTop />
  <ContainerTable/>
</div>*/

LayoutInner.propTypes = {
  children: React.PropTypes.node
};

export default (LayoutInner);
