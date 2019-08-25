import React, { useState } from 'react';
import { useMappedState } from 'redux-react-hook';
import { MESSAGE_TYPE } from '../../store/actions';
import { sendMessage } from '../../plugins/chatkit';

function Chat() {
  const [text, setText] = useState('');
  const datas = useMappedState(state => state.datas);

  const sendText = () => {
    sendMessage(text);
    setText('');
  };

  return (
    <div>
      <ul>
        {datas.map(data => {
          if (data.type === MESSAGE_TYPE) {
            const { message } = data;
            const userName = message.userStore.users[message.senderId].name;
            return message.parts.map(part => {
              if (part.payload.type === 'text/plain') {
                return (
                  <li>
                    {userName}: {part.payload.content}
                  </li>
                );
              }
            });
          }
        })}
      </ul>
      <input value={text} onChange={e => setText(e.target.value)} />
      <button onClick={sendText}>SUBMIT</button>
    </div>
  );
}

export default Chat;
