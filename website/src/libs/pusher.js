import Pusher from 'pusher-js';
import axios from './axios'

const res = await axios.get('/auth/me').catch((err) => console.warn('sign in'));

export const pusher = new Pusher('d0659b15c78f9c4546a6', {
      channelAuthorization: {
        endpoint: `${process.env.REACT_APP_API_URL}/api/pusher/auth/${res?.data.email}`,
        transport: 'ajax',
      },
      cluster: 'ap2',
    }
);