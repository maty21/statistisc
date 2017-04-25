import React, { PropTypes, Component } from 'react';
import { lib, hterm } from 'hterm-umdjs';
import { emit, init } from '../actions/terminal.action';
import { connect } from 'react-redux';
import TOPICS from '../constants/topics';
const defaultStyle = {
  marginLeft: 20
};
const terminalStyle = {
  display: 'block',
  position: 'relative',
  width: '80vh',
  height: '70vh'
};
// const terminalStyle = {
//   width: '80%',
//   height: '90%',
//   position: 'absolute',
//   left: '20%'
// };

// /////////////////////////////////////

// ////////////////////////////////////////////////////
class Terminal extends Component {
  constructor(props, context) {
    super(props, context);
    //   this.state = { filter: SHOW_ALL };
    this.runHterm();
    this.term = null;
    // this.Wetty = Wetty;
    const self = this;
    this.props.init();
    //     this.store = context;
    //   this.store.subscribe((data)=>{
    //     console.log(data);
    //     })
  }

  componentDidMount() {}

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps) {
      console.log(`new data arrived from server: ${nextProps}`);
      this.term.io.print(nextProps.terminal.data);
    }

    // if (nextProps.commands.incommingCommand != {}) {
    //   console.log(`!!!!${nextState} - ${nextProps} is incoming`);
    // } else {
    //   console.log(`!!!!${nextState} - ${nextProps} is someting else`);
    // }

    return false;
  }

  _sendString(str) {
    //  socket.emit('input', str);
    //  self.sendString(str);
    console.log(str);
    this.props.commandsActions.input(str);
  }

  _onTerminalResize(col, row) {
    // this._sendString( { col: col, row: row });
    this.props.commandsActions.resize({ col, row });
    //  socket.emit('resize', { col: col, row: row });
  }

  runHterm() {
    // var self = this;
    lib.init(() => {
      console.log('Hi');
      hterm.defaultStorage = new lib.Storage.Local();
      this.term = new hterm.Terminal();
      window.term = this.term;
      this.term.decorate(document.getElementById('terminal'));

      // self.term.setCursorPosition(0, 0);
      // self.term.setCursorVisible(true);
      // self.term.prefs_.set('ctrl-c-copy', true);
      // self.term.prefs_.set('ctrl-v-paste', true);
      // self.term.prefs_.set('use-default-window-copy', true);

      this.term.onTerminalReady = () => {
        // Create a new terminal IO object and give it the foreground.
        // (The default IO object just prints warning messages about unhandled
        // things to the the JS console.)

        var io = this.term.io.push();
        this.term.installKeyboard();
      //  this.term.io.println('Print a string without a newline');
      //  this.term.io.println('Print a string and add CRLF');
        let tempStr = '';
        io.onVTKeystroke = (str) => {
          if (str == '\u000D') {
       //     this.term.io.println('');
          } else {
       //     this.term.io.print(str);
       //     tempStr += str;
          }

          console.log(`onVTKeystroke - ${JSON.stringify(str)} `);
          this.props.emit({ data: str });
        };

        io.sendString = (str) => {
          console.log(`sendString - ${str} `);
        };

        io.onTerminalResize = (columns, rows) => {
          console.log(`onTerminalResize - ${columns} x ${rows} `);
        };
      };
    });
  }

  //    self.term.runCommandClass(self.Wetty, document.location.hash.substr(1));
  //       self.term.runCommandClassNew( (argv)=> {
  //             self.argv_ = argv;
  //             self.io = null;
  //             self.pid_ = -1;
  //          },
  //          ()=>{
  //             self.io = self.argv_.io.push();

  //             self.io.onVTKeystroke = self._sendString.bind(self);
  //             self.io.sendString = self._sendString.bind(self);
  //             self.io.onTerminalResize = self._onTerminalResize.bind(self);
  //          }, document.location.hash.substr(1));

  //       // socket.emit('resize', {
  //       //     col: term.screenSize.width,
  //       //     row: term.screenSize.height
  //       // });

  //       // if (buf && buf !== '')
  //       // {
  //       //     self.term.io.writeUTF16(buf);
  //       //     buf = '';
  //       // }
  //   });

  // }

  getChildContext() {
    //    return {  muiTheme: Styles.ThemeManager.getMuiTheme(MyRawTheme)};
  }

  handleSave(text) {
    if (text.length !== 0) {
      //      this.props.addTodo(text);
    }
  }

  render() {
    return <div id="terminal" style={terminalStyle}/>;
  }
}

Terminal.propTypes = {};

const mapStateToProps = (state) => ({
  terminal: state.terminal
});

export default connect(mapStateToProps, { emit, init })(Terminal);
