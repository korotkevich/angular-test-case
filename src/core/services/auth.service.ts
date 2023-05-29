import { Injectable } from '@angular/core'
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import * as bcrypt from 'bcryptjs';

import { StoreService } from './store.service';
import { ProfileService } from './profile.service';
import { IUser } from '../interfaces/user';

@Injectable()
export class AuthService {
    private readonly isLoggedIn$: BehaviorSubject<boolean>;

    constructor(private storeService: StoreService,
                private router: Router,
                private profileService: ProfileService) {
        this.isLoggedIn$ = new BehaviorSubject<boolean>(false);
    }

    private checkUser(login: string, password: string, user: IUser): boolean {
        return login === user.email && bcrypt.compareSync(password, user.password as string);
    }

    public login(login: string, password: string): void {
        const users = this.storeService.getItem('usersDB')
        const currentUser = users.find((user: IUser) => this.checkUser(login, password, user));

        if (currentUser) {
            this.profileService.setCurrentUser(currentUser);
            this.isLoggedIn$.next(true);
        }
    }

    public isUserLoggedIn(): BehaviorSubject<boolean> {
        return this.isLoggedIn$;
    }

    public updateIsLoggedIn(isLoggedIn: boolean): void {
        this.isLoggedIn$.next(isLoggedIn);
    }

    public logout(): void {
        this.storeService.removeItem('current');
        this.isLoggedIn$.next(false);
    }
}
