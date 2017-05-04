import React from 'react';
import {AppBar, Divider, Drawer, MenuItem, TextField, FlatButton} from 'material-ui';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import MessageList from './MessageList';
import UserList from './UserList';
import BtnMenus from './BtnMenus';
import CustomEvent from './Event';
import Config from './Constants';
import Me from './User';

const Socket = window.socket;

let _this = null;

export default class MainView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      Me,
      msg: '',
      msg_list: [],
      ready: true,
    };

    _this = this;

  }

  handleToggle() {
    _this.setState({open: !_this.state.open});
  }

  sendMessage(e) {
    e.preventDefault();
    e.stopPropagation();
    CustomEvent.dispatch(Config.ClientEvents.SendMessage, _this.state.msg);
    _this.setState({msg: ''});
    return false;
  }

  msgInput(e) {
    _this.setState({msg: e.target.value});
  }


  render() {
    return (
        <div>
          <div>
            <div className="AppWrap">
              <div className="Header">
                <AppBar title="test" onLeftIconButtonTouchTap={this.handleToggle}/>
              </div>
              <div className="Body">
                <MessageList/>
              </div>
              <div className="Footer">
                <form onSubmit={this.sendMessage}>
                  <TextField
                      className="ChatInput"
                      hintText="Input Message"
                      floatingLabelText="Chat"
                      value={this.state.msg}
                      onChange={this.msgInput}
                  />
                  <FlatButton
                      className="ChatSendBtn"
                      label="Send >"
                      labelPosition="before"
                      onTouchTap={this.sendMessage}
                      style={{
                        width: 100,
                        height: 70
                      }}
                  />
                </form>

              </div>
            </div>

            <Drawer open={this.state.open}>
              <AppBar title={this.state.Me.name}
                      iconElementLeft={<IconButton><NavigationClose /></IconButton>}
                      onLeftIconButtonTouchTap={this.handleToggle}
              />
              <UserList/>
            </Drawer>

            <BtnMenus
                show={this.state.ready}
            />

          </div>
        </div>
    );
  }
}