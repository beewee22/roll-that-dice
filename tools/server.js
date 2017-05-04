import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config.dev';
import open from 'open';
import socket from 'socket.io';
import { Server } from 'http';

import Config from '../src/components/Constants';


const port = 3000;
const app = express();
const server = Server(app);
const compiler = webpack(config);
const io = socket(server);


app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true, publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use('*', function(req, res) {
  if(~req.url.indexOf('favicon')) {
    return false;
  }
 res.sendFile(path.join(__dirname, '../src/index.html'));
});

let user_list = [];
let msg_list = [];
// limit for message history length
const msg_limit = 300;

io.on('connection', function(socket) {

  let user = {
    userName: '',
    socketId: socket.id,
    valid: false
  };

  user_list.push(user);

  console.log('a user connected');
  console.log(`user_list ${user_list.map((o) => o.userName||o.socketId).join(' ,')}`);

  // initialize app
  socket.on(Config.EventNames.Initialize, function (initObj) {
    console.log('initializing for ', initObj.userName, '...');
    let setName = setMyName(initObj.userName);

    socket.emit(Config.EventNames.SetUserNameResult, setName);
    socket.emit(Config.EventNames.UserListChanged, user_list);
    socket.emit(Config.EventNames.MessageListChanged, msg_list);
    socket.emit(Config.EventNames.InitailizeComplete, setName);
  });

  // client sends message
  socket.on(Config.EventNames.SendMessage, function (msg) {
    if(!user.valid){ return false; }
    msg_list.push(new Msg(msg, user, new Date()));
    msg_list.splice(0, msg_list.length - msg_limit);
    io.sockets.emit(Config.EventNames.MessageListChanged, msg_list);
  });

  // client requests message list
  socket.on(Config.EventNames.GetMessageList, function (){
    io.emit(Config.EventNames.MessageListChanged, msg_list);
  });

  // client sends his name
  socket.on(Config.EventNames.SetUserName, function(name) {
    let setName = setMyName(name);
    socket.emit(Config.EventNames.SetUserNameResult, setName);
  });

  socket.on(Config.EventNames.GetUserList, function () {
    let _users = user_list
        .filter( (user) => { return user.valid; })
        .map( (user) => {return user.userName; });
    console.log('a user request user list.');
    console.log(`${JSON.stringify(_users)}`);
    socket.emit(Config.EventNames.UserListChanged, _users);
  });

  // client has been disconnected
  socket.on('disconnect', function (){
    // delete user from user list
    user_list.splice(
        user_list.findIndex( o => o.socketId === socket.id )
        , 1
    );
    console.log('a user disconnect');
  });


  /**
   * @param {string} name user's name
   * @returns {{result: boolean, code: string, name: string}}
   */
  function setMyName (name){
    if( typeof name === 'number' ) {
      name = name + '';
    }
    if( typeof name !== 'string' ){
      return {
        result: false,
        code: Config.Msg.ErrNameNotString,
        name: user.userName
      };
    }
    if(user_list.find( (user) => user.userName === name )) {
      return {
        result: false,
        code: Config.Msg.ErrNameDup,
        name: user.userName
      };
    }
    user.userName = name;
    user.valid = true;
    return {
      result: true,
      code: Config.Msg.SuccessNameChange,
      name: user.userName
    };
  }
});

server.listen(port, function(err) {  
  if (err) {
    console.log('error', err); 
   } else {
      open(`http://localhost:${port}`);
   }
 });

/**
* @description 메세지의 원형 Class
* @param {String} msg, user, date: 메세지, 사용자, 날짜
* @return {Promise}
 */
class Msg {
  constructor(msg, user, date) {
    this.msg = msg;
    this.user = user;
    this.date = date;
  }
}