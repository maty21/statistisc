const http = require('http');
const express = require('express');
const https = require('https');
const path = require('path');
// const server = require('socket.io');
const pty = require('pty.js');
const fs = require('fs');
// Create the app, setup the webpack middleware
const app = express();
const server = new http.Server(app);
const io = require('socket.io')(server);

const PORT = process.env.PORT || 8091;

server.listen(PORT);

app.get('/', (req, res) => {
  console.log('page recived');
  res.sendfile(`${__dirname}/index.html`);
});

io.on('connection', (socket) => {
  const sshuser = '';
  const sshport = 22;
  const sshhost = 'localhost';
  const sshauth = 'password';
  const request = socket.request;
  console.log(`${new Date()} Connection accepted.`);

  let term;
  socket.on('OPEN_TERMINAL', (data) => {
    if (process.getuid() == 0) {
      term = pty.spawn('/bin/login', [], {
        name: 'xterm-256color',
        cols: 80,
        rows: 30
      });
    } else {
      term = pty.spawn(
        'ssh',
        [
          sshuser + sshhost,
          '-p',
          sshport,
          '-o',
          `PreferredAuthentications=${sshauth}`
        ],
        {
          name: 'xterm-256color',
          cols: 80,
          rows: 30
        }
      );
    }
    console.log(
      `${new Date()} PID=${term.pid} STARTED on behalf of user=${sshuser}`
    );
    term.on('data', (data) => {
  //    console.log(`sending data -> ${data}`);
      console.dir(data);
      socket.emit('SEND_SERVER_TO_TERMINAL', { data });
    });
    term.on('exit', (code) => {
      console.log(`${new Date()} PID=${term.pid} ENDED`);
    });
  });
  socket.on('resize', (data) => {
    console.log(`reciving resize -> ${data}`);
   // console.dir(data);

    term.resize(data.text.col, data.text.row);
  });
  socket.on('SEND_TERMINAL_TO_SERVER', (data) => {
  //  console.log(`reciving input -> ${data}`);
 //   console.dir(data);
    // console.log(`###bla:${data.sendCommand[0].text}`);
    // if (data.sendCommand[0].type == 'server/input') {
    //   if (typeof data.sendCommand.text.text === 'string') {
    //     term.write(data.sendCommand[0].text.text);
    //   }
    // }
    term.write(data);
  });
  socket.on('disconnect', () => {
    if (term) {
      term.end();
    }
  });
  socket.on('CLOSE_TERMINAL', () => {
    if (term) {
      term.end();
      console.log(`###### terminal ended ${socket.id} ${new Date()} PID=${term.pid} STARTED on behalf of user=${sshuser}`);
    }
  });
});

process.on('uncaughtException', (e) => {
  console.error(`!!!!!!!!!!!!!!!!!!!!!Error: ${e}`);
});

