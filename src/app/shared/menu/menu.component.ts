import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription} from 'rxjs';

import { AuthService } from '../../../core/services/auth.service';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.less']
})
export class MenuComponent implements OnInit, OnDestroy {
    menuItems!: Array<string>;
    private subscription!: Subscription;

    constructor(private authService: AuthService, private router: Router) {
    }

    ngOnInit(): void {
        this.subscription = this.authService.isUserLoggedIn().subscribe(isLoggedIn => {
            isLoggedIn ? this.menuItems = ['Home', 'Inventory', 'Reports', 'Billing', 'Profile'] : this.menuItems = ['Home'];
        })
    }

    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }

    public getRouterLink(item: string): string {
        return item === 'Home' ? `unauthorized/${item.toLowerCase()}` : `authorized/${item.toLowerCase()}`;
    }

    public getActiveRoute(item: string): boolean {
        return this.router.url.includes(item.toLowerCase());
    }
}

