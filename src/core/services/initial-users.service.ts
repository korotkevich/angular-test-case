import { Injectable } from '@angular/core';
import * as bcrypt from 'bcryptjs';

import { StoreService } from './store.service';
import { IUser } from "../interfaces/user";
import { getRandomNumber } from '../helpers/helpers';
import { Roles } from '../enums/roles';

@Injectable()
export class InitialUsersService {
    private users: IUser[] = [{
        email: 'alice91@gmail.com',
        firstName: 'Alice',
        lastName: 'Cooper',
        phone: '+79876113442',
        url: 'alice-cooper.com',
        password: bcrypt.hashSync('Welcome44!', 10),
        role: Roles[getRandomNumber(3)]
    }, {
        email: 'Mike93@gmail.com',
        firstName: 'Mike',
        lastName: 'Pierce',
        phone: '+70864897352',
        url: 'mike-pierce.com',
        password: bcrypt.hashSync('TestDrive23!', 10),
        role: Roles[getRandomNumber(3)]
    }]

    constructor(private store: StoreService) {
    }

    public setInitialUsers(): void {
        if (!this.store.getItem('usersDB')) {
            this.store.setItem('usersDB', this.users)
        }
    }
}
