import { Modal, Button } from 'antd';
import { connect } from 'react-redux';
import { closeModal } from '../actions/modal.action';
import { terminalDisconnect } from '../actions/terminal.action';
import { withState } from 'recompose';
import Terminal from '../components/Terminal';
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
    let { modal, closeModal, terminalDisconnect } = this.props;
    return (
      <div>

        <Modal
          style={terminalStyle}
          width={'90vh'}
          visible={modal.visible}
          onCancel={() => {
            terminalDisconnect();
            closeModal();
          }}
          footer={null}>
          <Terminal closing={this.closing}/>
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

export default connect(mapStateToProps, { closeModal, terminalDisconnect })(
  withState('close', 'onClose', false)(TerminalModal)
);

// WEBPACK FOOTER //
// ./components/TerminalModal.react.js

// WEBPACK FOOTER //
// ./components/TerminalModal.react.js
