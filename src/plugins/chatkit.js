import { ChatManager, TokenProvider } from '@pusher/chatkit-client';
import * as jwt from 'jsonwebtoken';
import { pushMessage, pushPresence, setUserId } from '../store/actions';
import store from '../store';

let user;

const defaultUserId =
  window.localStorage.getItem('userId') ||
  Math.random()
    .toString(36)
    .substring(7);

const makeAdminToken = () => {
  // only do this on test, this secret key is free, don't try this on production
  return jwt.sign(
    {
      instance: process.env.REACT_APP_INSTANCE_ID,
      iss: `api_keys/${process.env.REACT_APP_SECRET_KEY_ID}`,
      sub: 'admin',
      su: true
    },
    process.env.REACT_APP_SECRET_KEY_VALUE,
    { expiresIn: 60 * 60 }
  );
};

const updateUser = (image, userId, userName) => {
  return fetch(process.env.REACT_APP_API_ENDPOINT + '/users/' + userId, {
    method: 'PUT',
    body: JSON.stringify({
      name: userName,
      custom_data: {
        image
      }
    }),
    headers: {
      Authorization: `Bearer ${makeAdminToken()}`
    }
  });
};

const createUser = (image, userName, userId) => {
  return fetch(process.env.REACT_APP_API_ENDPOINT + '/users', {
    method: 'POST',
    body: JSON.stringify({
      id: userId,
      name: userName,
      custom_data: {
        image
      }
    }),
    headers: {
      Authorization: `Bearer ${makeAdminToken()}`
    }
  })
    .then(res => {
      return res.json();
    })
    .then(json => {
      if (json.error === 'services/chatkit/user_already_exists') {
        return updateUser(image, userId, userName);
      }
      return json;
    });
};

const createTokenByUserId = userId => {
  return new TokenProvider({
    url: process.env.REACT_APP_TOKEN_ENDPOINT,
    queryParams: {
      user_id: userId
    }
  });
};

const subscribe = currentUser => {
  return currentUser.subscribeToRoomMultipart({
    roomId: process.env.REACT_APP_LOBBY_ROOM_ID,
    hooks: {
      onUserStartedTyping: user => {
        console.log('onUserStartedTyping', user);
      },
      onUserStoppedTyping: user => {
        console.log('onUserStoppedTyping', user);
      },
      onPresenceChanged: (state, user) => {
        console.log('onPresenceChanged', state, user);
        store.dispatch(pushPresence(user));
      },
      onMessage: message => {
        console.log('Received message:', message);
        store.dispatch(pushMessage(message));
      }
    }
  });
};

export const connect = async (image, userName, userId = defaultUserId) => {
  window.localStorage.setItem('userId', userId);

  store.dispatch(setUserId(userId));

  await createUser(image, userName, userId);

  const chatManager = new ChatManager({
    instanceLocator: process.env.REACT_APP_INSTANCE_LOCATOR,
    userId: userId,
    tokenProvider: createTokenByUserId(userId)
  });

  return chatManager.connect().then(async currentUser => {
    user = currentUser;
    if (currentUser.rooms && currentUser.rooms[0]) {
      await currentUser.joinRoom({
        roomId: process.env.REACT_APP_LOBBY_ROOM_ID
      });
    }
    await subscribe(currentUser);
  });
};

export const sendMessage = messageText => {
  user
    .sendSimpleMessage({
      roomId: process.env.REACT_APP_LOBBY_ROOM_ID,
      text: messageText
    })
    .then(messageId => {
      console.log(`Added message`);
    });
};
