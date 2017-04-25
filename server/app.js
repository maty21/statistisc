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
    term = pty.spawn('ssh',[sshuser + sshhost,'-p',sshport,'-o',`PreferredAuthentications=${sshauth}`],{
        name: 'xterm-256color',
        cols: 80,
        rows: 30
      });
  }
  console.log(
    `${new Date()} PID=${term.pid} STARTED on behalf of user=${sshuser}`
  );
  term.on('data', (data) => {
    console.log(`sending data -> ${data}`);
    console.dir(data);
   // socket.emit('SEND_SERVER_TO_TERMINAL', { type: 'output', text: data });
    socket.emit('SEND_SERVER_TO_TERMINAL', { data });
    
    //    socket.emit('action', {type:"output",text:data});
    // socket.emit('action',{type:'input', data:data});
  });
  term.on('exit', (code) => {
    console.log(`${new Date()} PID=${term.pid} ENDED`);
  });


  });
  socket.on('resize', (data) => {
    console.log(`reciving resize -> ${data}`);
    console.dir(data);

    term.resize(data.text.col, data.text.row);
  });
  socket.on('SEND_TERMINAL_TO_SERVER', (data) => {
    console.log(`reciving input -> ${data}`);
    console.dir(data);
   // console.log(`###bla:${data.sendCommand[0].text}`);
    // if (data.sendCommand[0].type == 'server/input') {
    //   if (typeof data.sendCommand.text.text === 'string') {
    //     term.write(data.sendCommand[0].text.text);
    //   }
    // }
    term.write(data);
  });
  socket.on('disconnect', () => {
    if(term){
       term.end();
    }
   
  });
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', (data) => {
    console.log(data);
  });
});

process.on('uncaughtException', (e) => {
  console.error(`!!!!!!!!!!!!!!!!!!!!!Error: ${e}`);
});

// io.on('connection', (socket) => {

// });

// app.listen(PORT);

// io.on('connection', function(socket) {
//   // <insert relevant code here>
//   socket.emit('mappy:playerbatch', playerbatch);
// });

// "start": "webpack-dev-server --hot --inline --progress --colors",

// const opts = require('optimist');

// opts.options({
//     sslkey: {
//         demand: false,
//         description: 'path to SSL key'
//     },
//     sslcert: {
//         demand: false,
//         description: 'path to SSL certificate'
//     },
//     sshhost: {
//         demand: false,
//         description: 'ssh server host'
//     },
//     sshport: {
//         demand: false,
//         description: 'ssh server port'
//     },
//     sshuser: {
//         demand: false,
//         desnode-pty'cription: 'ssh user'
//     },
//     sshauth: {
//         demand: false,
//         description: 'defaults to "password", you can use "publickey,password" instead'
//     },
//     port: {
//         demand: true,
//         alias: 'p',
//         description: 'wetty listen port'
//     },
// }).boolean('const os = require('os');
// const pty = require('node-pty');
// const socketio = require('socket.io');

// const shell = os.platform() === 'win32' ? 'powershell.exe' : 'bash';

// const ptyProcess = pty.spawn(shell, [], {
//   name: 'xterm-color',
//   cols: 80,
//   rows: 30,
//   cwd: process.env.HOME,
//   env: process.env
// });

// ptyProcess.on('data', (data)  => {
// socket.emit('terminal-data',)
// });

// ptyProcess.write('ls\r');
// ptyProcess.resize(100, 40);
// ptyProcess.write('ls\r');allow_discovery').argv;

// if (opts.sshport) {
//     sshport = opts.sshport;
// }
//
// if (opts.sshhost) {
//     sshhost = opts.sshhost;
// }
//
// if (opts.sshauth) {
// 	sshauth = opts.sshauth
// }
//
// if (opts.sshuser) {
//     globalsshuser = opts.sshuser;
// }
//
// if (opts.sslkey && opts.sslcert) {
//     runhttps = true;
//     opts['ssl'] = {};
//     opts.ssl['key'] = fs.readFileSync(path.resolve(opts.sslkey));
//     opts.ssl['cert'] = fs.readFileSync(path.resolve(opts.sslcert));
// }

// const os = require('os');
// const pty = require('node-pty');
// const socketio = require('socket.io');

// const shell = os.platform() === 'win32' ? 'powershell.exe' : 'bash';

// const ptyProcess = pty.spawn(shell, [], {
//   name: 'xterm-color',
//   cols: 80,
//   rows: 30,
//   cwd: process.env.HOME,
//   env: process.env
// });

// ptyProcess.on('data', (data)  => {
// socket.emit('terminal-data',)
// });

// ptyProcess.write('ls\r');
// ptyProcess.resize(100, 40);
// ptyProcess.write('ls\r');
