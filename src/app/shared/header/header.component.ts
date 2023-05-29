import {Component, OnDestroy, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {map, Subscription} from 'rxjs';

import { AuthService } from '../../../core/services/auth.service';
import { ProfileService } from '../../../core/services/profile.service';
import { IUser } from '../../../core/interfaces/user';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit, OnDestroy {
    isLoggedIn!: boolean;
    userName$ = this.profileService.getCurrentUser().pipe(
        map((user: IUser) => `${user.firstName} ${user.lastName}`)
    );
    isProfileUpdated$ = this.profileService.getIsProfileUpdated();
    private subscription!: Subscription;

    constructor(private authService: AuthService,
                private router: Router,
                private profileService: ProfileService) {
    }

    ngOnInit(): void {
        this.subscription = this.authService.isUserLoggedIn().subscribe(isLoggedIn => {
            this.isLoggedIn = isLoggedIn;
            isLoggedIn ? this.router.navigate(['/authorized/profile']) : this.router.navigate(['/unauthorized/login']);
        })
    }

    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }

    public logout(): void {
        this.authService.logout();
    }

    public navigateToProfile(): void {
        this.router.navigate(['/authorized/profile']);
    }
}
