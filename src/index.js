/* eslint-disable import/default */
require('./components/reset.css');
require('./components/app.css');

import 'babel-polyfill' ;
import React from 'react';
import { render } from 'react-dom';
import CustomEvent from './components/Event';
import injectTapEventPlugin from 'react-tap-event-plugin';
import darkBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MainView from './components/App';

import Config from './components/Constants';
import Me from './components/User';
const Socket = window.socket;
let isReady = false;


injectTapEventPlugin();

//<editor-fold desc="Main Socket.io Listeners">
Socket.on(Config.EventNames.ResponseMessageList, function (msgList) {
  console.log(msgList);
});

Socket.on(Config.EventNames.InitailizeComplete, function (response) {
  ProcInitComplete(response);
});

Socket.on(Config.EventNames.SetUserNameResult, function (result) {
  if(result.result) {
    sessionStorage.setItem(Config.USERNAME_STORAGE_KEY, result.name);
  }
});

Socket.on(Config.EventNames.UserListChanged, function (users) {
});
//</editor-fold>

//<editor-fold desc="Initialize Function">
function Init () {

  let userName;
  // check session storage has user_name
  if(!sessionStorage.hasOwnProperty(Config.USERNAME_STORAGE_KEY)) {
    while(!userName) {
      userName = window.prompt(Config.Msg.AskNameChange);
    }
  } else {
    userName = sessionStorage.getItem(Config.USERNAME_STORAGE_KEY);
  }

  Socket.emit(Config.EventNames.Initialize, {userName});

}

function ProcInitComplete(response) {
  if (response.result) {
    isReady = true;
    render(
        <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
          <MainView/>
        </MuiThemeProvider>
        ,
        document.getElementById('main')
    );
    Me.create(response.name);
    getUserList();
  }
}
//</editor-fold>

//<editor-fold desc="Main Functions">
function SendMessage (msg) {
  Socket.emit(Config.EventNames.SendMessage, msg);
}

function getUserList () {
  Socket.emit(Config.EventNames.GetUserList);
}
//</editor-fold>

//<editor-fold desc="Main Event Listeners">
(()=>{
  CustomEvent.subscrive('test', () => {console.log('qwe'); });

  CustomEvent.subscrive(Config.ClientEvents.SendMessage, SendMessage);
})();
//</editor-fold>

// initialize
Init();