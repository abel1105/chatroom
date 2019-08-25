import React from 'react';
import Analytics from 'react-router-ga';
import 'normalize.css';
import s from './App.module.scss';
import { HashRouter, Redirect, Route } from 'react-router-dom';
import Home from './router/Home';
import Chat from './router/Chat';
import { useMappedState } from 'redux-react-hook';

function App() {
  const isLogin = useMappedState(state => state.isLogin);

  return (
    <div className={s.App}>
      <div className={s.NavBar}>Chatroom</div>
      <HashRouter>
        <Analytics id="UA-142485991-1" debug>
          <Route path="/" exact component={Home} />
          <Route
            path="/chat"
            exact
            render={() => (isLogin ? <Chat /> : <Redirect to="/" />)}
          />
        </Analytics>
      </HashRouter>
    </div>
  );
}

export default App;
