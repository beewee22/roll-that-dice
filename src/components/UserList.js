/**
 * Created by jrjung on 2017-05-04.
 */
import React from 'react';
import Config from './Constants';
import {Chip} from 'material-ui';

const Socket = window.socket;

const UserListStyle = {
  padding: 12
};
const UserListChipStyle = {
  display: 'inline-flex',
  margin: 4
};

export default class UserList extends React.Component {
  constructor(prop){
    super(prop);

    this.state = {
      userList: []
    };

    Socket.on(Config.EventNames.UserListChanged, (userList) => {
      this.setState({userList});
    });
  }

  render() {
    return (
        <div style={UserListStyle}>
          {
            this.state.userList.map((user, i) => {
              return <Chip key={i} style={UserListChipStyle}>{user}</Chip>;
            })
          }
        </div>);
  }
}