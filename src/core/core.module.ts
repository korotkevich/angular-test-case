import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { ProfileService } from './services/profile.service';
import { StoreService } from './services/store.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { InitialUsersService } from './services/initial-users.service';

@NgModule({
    imports: [
        CommonModule
    ],
    providers: [
        AuthService,
        ProfileService,
        StoreService,
        AuthGuard,
        InitialUsersService
    ]
})
export class CoreModule {}
