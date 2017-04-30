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

  componentWillReceiveProps({modal}) {
    if (this.props.modal.visible != modal.visible) {
      if (modal.visible) {
        this.props.onModalStateChange(!this.props.isClose);
      }
    }
  }
  render() {
    let {
      modal,
      closeModal,
      terminalDisconnect,
      onModalStateChange,
      isClose
    } = this.props;

    return (
      <div>

        <Modal
          style={terminalStyle}
          width={'90vh'}
          visible={modal.visible}
          onCancel={() => {
            onModalStateChange(!isClose);
            closeModal();
          }}
          footer={null}>
          <Terminal isClose={isClose}/>
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
  withState('isClose', 'onModalStateChange', true)(TerminalModal)
);

// WEBPACK FOOTER //
// ./components/TerminalModal.react.js

// WEBPACK FOOTER //
// ./components/TerminalModal.react.js
