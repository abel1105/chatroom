import React, { useState } from 'react';
import cx from 'classnames';
import { connect } from '../../plugins/chatkit';
import { useDispatch } from 'redux-react-hook';
import { login } from '../../store/actions';
import s from './index.module.scss';

function Home({ history }) {
  const [name, setName] = useState('Abel');
  const [image, setImage] = useState('dog-1');
  const [type, setType] = useState('dog');
  const dispatch = useDispatch();

  const onSubmit = async () => {
    await connect(image, name);
    dispatch(login());
    history.push('/chat');
  };

  return (
    <div className={s.root}>
      <div className={s.container}>
        <div className={s.column}>
          <button
            className={cx(s.button, { [s.active]: type === 'dog' })}
            onClick={() => setType('dog')}
          >
            狗狗
          </button>
          <button
            className={cx(s.button, { [s.active]: type === 'cat' })}
            onClick={() => setType('cat')}
          >
            貓貓
          </button>
        </div>
        <div className={s.column}>
          <h1 className={s.title}>WELCOME</h1>
          <h2 className={s.subtitle}>阿貓阿狗聊天室</h2>
          <div className={s.avatar}>
            <img src={require(`../../images/${image}.png`)} />
            <div className={s.shadow} />
          </div>
          <input
            className={s.input}
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="輸入暱稱"
          />
          <button className={s.submit} onClick={onSubmit}>
            進入聊天
          </button>
        </div>
        <div className={s.column}>
          <div
            className={cx(s.card, { [s.active]: `${type}-1` === image })}
            onClick={() => setImage(`${type}-1`)}
          >
            <img src={require(`../../images/${type}-1.png`)} />
          </div>
          <div
            className={cx(s.card, { [s.active]: `${type}-2` === image })}
            onClick={() => setImage(`${type}-2`)}
          >
            <img src={require(`../../images/${type}-2.png`)} />
          </div>
          <div
            className={cx(s.card, { [s.active]: `${type}-3` === image })}
            onClick={() => setImage(`${type}-3`)}
          >
            <img src={require(`../../images/${type}-3.png`)} />
          </div>
          <div
            className={cx(s.card, { [s.active]: `${type}-4` === image })}
            onClick={() => setImage(`${type}-4`)}
          >
            <img src={require(`../../images/${type}-4.png`)} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
