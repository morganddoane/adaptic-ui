import { IUserAuthQuery_User } from 'GraphQL/Auth/queries';

export class UserContext {
    id: string;
    first: string;
    last: string;
    username: string;
    full: string;
    email: string;
    roles: string;
    status: string;

    constructor(user: IUserAuthQuery_User) {
        this.id = user.id;
        this.first = user.first;
        this.last = user.last;
        this.username = user.username;
        this.full = user.full;
        this.email = user.email;
        this.roles = user.roles;
        this.status = user.status;
    }
}
