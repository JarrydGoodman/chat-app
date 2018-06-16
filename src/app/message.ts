import { User } from './user';

export class Message {
    body: string;
    sent: number;
    from: User;
    to: User;
};