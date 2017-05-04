/**
 * Created by jrjung on 2017-05-04.
 */
import React from 'react';
import ReactDom from 'react-dom';
import Config from './Constants';
import {Card, CardHeader, CardText} from 'material-ui';
import AddIcon from 'material-ui/svg-icons/content/add';

const Socket = window.socket;

const MessageListStyle = {
  overflowX: 'hidden',
  overflowY: 'scroll'
};
const MessageHeaderStyle = {
  padding: '14px 0 0 14px',
  fontWeight: 'bold'
};
const MessageTextStyle = {
  whiteSpace: 'normal',
  wordBreak: 'break-all',
  wordWrap: 'normal',
};

export default class MessageList extends React.Component {
  constructor(prop) {
    super(prop);

    this.state = {
      msg_list: []
    };

    Socket.on(Config.EventNames.MessageListChanged, (msg_list) => {
      this.setState({msg_list});
      this.scrollToBottom();
    });

    Socket.emit(Config.EventNames.GetMessageList);
  }

  scrollToBottom() {
    const node = ReactDom.findDOMNode(this.messagesEnd);
    node.scrollIntoView({behavior: 'smooth'});
  }

  render() {
    return (
        <div style={MessageListStyle}>

          {
            this.state.msg_list.map((msg, i) => {
              return (


              <Card key={i}>
                <CardHeader
                    title={msg.user.userName}
                    style={MessageHeaderStyle}
                >&nbsp;
                </CardHeader>
                <CardText
                    style={MessageTextStyle}
                >
                  {msg.msg}
                </CardText>
              </Card>
              );
            })
          }
          <div style={{float: 'left', clear: 'both' }}
               ref={(el) => { this.messagesEnd = el; }}
          >&nbsp;</div>

        </div>
    );
  }

}