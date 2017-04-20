import { Modal, Button } from 'antd';
import { connect } from 'react-redux';
import { closeModal } from '../actions/modal.action';
import  Terminal  from '../components/Terminal';
const terminalStyle = {
  display: 'block',
  position: 'relative',
  width: '80vh',
  height: '60vh'
};

class TerminalModal extends React.Component {
  state = { visible: false };
  showModal = () => {
    this.setState({
      visible: true
    });
  };
  handleOk = () => {
    this.setState({
      visible: false
    });
  };
  handleCancel = () => {
    this.setState({
      visible: false
    });
  };
  render() {
    let { modal, closeModal } = this.props;
    return (
      <div >
        <Button type="primary" onClick={this.showModal}>Show Modal</Button>
        <Modal style={terminalStyle} width={'90vh'}
          title="Modal"
          visible={modal.visible}
          onOk={this.handleOk}
          onCancel={closeModal}
          okText="OK"
          cancelText="Cancel">
          <Terminal/>
         
        </Modal>
      </div>
    );
  }
}

TerminalModal.propTypes = {
  // columns: React.PropTypes.array.isRequired,
  // data: React.PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  modal: state.modal
});

export default connect(mapStateToProps, { closeModal })(TerminalModal);

// WEBPACK FOOTER //
// ./components/TerminalModal.react.js

// WEBPACK FOOTER //
// ./components/TerminalModal.react.js
