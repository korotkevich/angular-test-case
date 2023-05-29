import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { StoreService } from './store.service';
import { IUser } from '../interfaces/user';

@Injectable()
export class ProfileService {
    private readonly currentUser$: BehaviorSubject<IUser>;
    private readonly isProfileUpdated$: BehaviorSubject<boolean>;

    constructor(private storeService: StoreService) {
        this.currentUser$ = new BehaviorSubject<IUser>({});
        this.isProfileUpdated$ = new BehaviorSubject<boolean>(false);
    }

    public setCurrentUser(user: IUser): void {
        this.storeService.setItem('current', user);
        this.currentUser$.next(user);
    }

    public getCurrentUser(): Observable<IUser> {
        if (this.storeService.getItem('current')) {
            this.setCurrentUser(this.storeService.getItem('current'));
        }

        return this.currentUser$;
    }

    public updateUser(user: IUser): void {
        this.storeService.setItem('current', user);
        this.currentUser$.next(user);
    }

    public getIsProfileUpdated(): Observable<boolean> {
        return this.isProfileUpdated$;
    }

    public updateIsProfileUpdated(isUpdated: boolean): void {
        this.isProfileUpdated$.next(isUpdated);
    }
}
