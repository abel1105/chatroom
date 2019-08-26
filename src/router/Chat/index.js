import React, { useState } from 'react';
import cx from 'classnames';
import s from './index.module.scss';
import { useMappedState } from 'redux-react-hook';
import { MESSAGE_TYPE, PRESENCE_TYPE } from '../../store/actions';
import { sendMessage } from '../../plugins/chatkit';
import Icon from '@material-ui/core/Icon';
import moment from 'moment';
import Tooltip from '@material-ui/core/Tooltip';

function Chat() {
  const [text, setText] = useState('');
  const datas = useMappedState(state => state.datas);
  const userId = useMappedState(state => state.userId);
  const image = useMappedState(state => state.image);
  const name = useMappedState(state => state.name);
  const [info, setInfo] = useState(`大家好，我是${name}`);
  const [isInfoEditable, setIsInfoEditable] = useState(false);

  const sendText = () => {
    if (text === '') return false;
    sendMessage(text);
    setText('');
  };

  return (
    <div className={s.root}>
      <div className={s.panel}>
        <img
          className={s.avatar}
          src={require(`../../images/small/${image}.png`)}
        />
        <h2 className={s.name}>{name}</h2>
        {isInfoEditable ? (
          <input
            className={s.info_input}
            value={info}
            onChange={e => setInfo(e.target.value)}
          />
        ) : (
          <h3 className={s.info}>{info}</h3>
        )}
        <button
          className={s.info_btn}
          onClick={() => setIsInfoEditable(!isInfoEditable)}
        >
          {isInfoEditable ? '儲存' : '編輯'}
        </button>
        <div className={s.circle}>大廳模式</div>
      </div>
      <div className={s.main}>
        <ul className={s.list}>
          {datas.map(data => {
            if (data.type === MESSAGE_TYPE) {
              const { message } = data;
              const time = moment(message.updatedAt).fromNow();
              const {
                name: userName,
                customData: { image: userImage = 'dog-1' } = {}
              } = message.userStore.users[message.senderId];
              return message.parts.map(part => {
                if (part.payload.type === 'text/plain') {
                  return (
                    <li
                      className={cx(s.list_item, {
                        [s.list_item_me]: message.senderId === userId
                      })}
                    >
                      <Tooltip title={userName}>
                        <div className={s.user_avatar}>
                          <img
                            src={require(`../../images/small/${userImage}.png`)}
                          />
                          <span>{userName}</span>
                        </div>
                      </Tooltip>
                      <div className={s.message}>{part.payload.content}</div>
                      <div className={s.time}>{time}</div>
                    </li>
                  );
                }
              });
            } else if (data.type === PRESENCE_TYPE) {
              const { current, previous } = data.user.state;
              const time = moment(data.user.updatedAt).fromNow();
              if (current === 'online' || previous === 'online') {
                return (
                  <li className={s.list_item}>
                    <div>
                      <b>{data.user.name}</b>{' '}
                      {current === 'online' ? '加入' : '離開'}了聊天室{' '}
                      <span className={s.time}>{time}</span>
                    </div>
                  </li>
                );
              }
            }
          })}
        </ul>
        <div className={s.sender}>
          <div className={s.sender_icon}>
            <Icon>insert_emoticon</Icon>
            <Icon>image</Icon>
            <Icon>attach_file</Icon>
          </div>
          <input
            className={s.sender_text}
            value={text}
            onChange={e => setText(e.target.value)}
          />
          <button className={s.sender_btn} onClick={sendText}>
            <Icon>send</Icon>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
