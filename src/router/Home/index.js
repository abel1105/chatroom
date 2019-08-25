import React, { useState } from 'react';
import { connect } from '../../plugins/chatkit';
import { useDispatch } from 'redux-react-hook';
import { login } from '../../store/actions';

function Home({ history }) {
  const [name, setName] = useState('Abel');
  const dispatch = useDispatch();

  const onSubmit = async () => {
    await connect(name);
    dispatch(login());
    history.push('/chat');
  };

  return (
    <div>
      <input value={name} onChange={e => setName(e.target.value)} />
      <button onClick={onSubmit}>submit</button>
    </div>
  );
}

export default Home;
