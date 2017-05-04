
const config = {
  USERNAME_STORAGE_KEY: 'rtd::user_name',
  EventNames: {
    Initialize: 'init',
    InitailizeComplete: 'init_complete',
    SendMessage: 'send_msg',
    GetMessageList: 'get_msg_list',
    ResponseMessageList: 'res_msg_list',
    SetUserName: 'send_my_name',
    SetUserNameResult: 'result_change_name',
    GetUserList: 'get_user_list',
    UserListChanged: 'user_list_changed',
    MessageListChanged: 'msg_list_changed',
  },
  Msg : {
    AskNameChange: '사용할 이름을 입력해 주세요',
    ErrNameDup: '사용 중인 이름입니다.',
    ErrNameNotString: '잘못된 입력입니다.',
    SuccessNameChange: '이름 설정이 성공했습니다.'
  },
  ClientEvents: {
    SendMessage: 'SendMessage',
  }
};

export default config;
