import {
  pushMessage, pushPresence,
  setUserId,
  setUserImage,
  setUserName
} from '../store/actions';
import store from '../store';


const defaultUserId =
  window.localStorage.getItem('userId') ||
  Math.random()
    .toString(36)
    .substring(7);

export const connect = async (image, userName, userId = defaultUserId) => {
  window.localStorage.setItem('userId', userId);
  window.localStorage.setItem('userName', userName);
  window.localStorage.setItem('userImage', image);

  store.dispatch(setUserId(userId));
  store.dispatch(setUserImage(image));
  store.dispatch(setUserName(userName));

  store.dispatch(pushPresence({
    name: userName,
    updatedAt: +new Date(),
    state: {
      current: 'online',
    }
  }));
};

export const sendMessage = messageText => {

  const { userId, name, image } = store.getState()
  store.dispatch(pushMessage({
    updatedAt: +new Date(),
    senderId: userId,
    userStore: {
      users: {
        [userId]: {
          name,
          customData: {
            image
          }
        }
      }
    },
    parts: [
      {
        payload: {
          type: 'text/plain',
          content: messageText
        }
      }
    ]
  }));
};
