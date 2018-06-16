import { User } from './user';
import { Message } from './message';

export const MESSAGES: Message[] = [
    {
        body: 'Hey',
        sent: 1238971248,
        from: {
            username: 'johndoe',
            password: 'password'
        },
        to: {
            username: 'elvis',
            password: 'password'
        }
    },
    {
        body: 'Howzit',
        sent: 1238971248,
        from: {
            username: 'elvis',
            password: 'password'
        },
        to: {
            username: 'johndoe',
            password: 'password'
        }
    }
];