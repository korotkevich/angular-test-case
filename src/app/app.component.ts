import { Component, OnInit } from '@angular/core';

import { InitialUsersService } from '../core/services/initial-users.service';
import { AuthService } from '../core/services/auth.service';
import { StoreService } from '../core/services/store.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
    constructor(private initUsers: InitialUsersService,
                private authService: AuthService,
                private store: StoreService) {}

    ngOnInit(): void {
        this.initUsers.setInitialUsers();

        if (this.store.getItem('current')) {
            this.authService.updateIsLoggedIn(!!this.store.getItem('current'));
        }
    }
}
