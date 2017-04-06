import { Modal, Button } from 'antd';
import { connect } from 'react-redux';
import { closeModal } from '../actions/modal.action';

class TerminalModal extends React.Component {
  state = { visible: false }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = () => {
    this.setState({
      visible: false,
    });
  }
  handleCancel = () => {
    this.setState({
      visible: false,
    });
  }
  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>Show Modal</Button>
        <Modal title="Modal" visible={this.state.visible}
          onOk={this.handleOk} onCancel={this.handleCancel}
          okText="OK" cancelText="Cancel"
        >
          <p>Bla bla ...</p>
          <p>Bla bla ...</p>
          <p>Bla bla ...</p>
        </Modal>
      </div>
    );
  }
}


TerminalModal.propTypes = {
  // columns: React.PropTypes.array.isRequired,
  data: React.PropTypes.array.isRequired

};



const mapStateToProps = (state) => (
  {
    data: state.modal.data

  }
);



export default connect(mapStateToProps, { closeModal })(TerminalModal);
