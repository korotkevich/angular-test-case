import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MenuComponent } from './menu/menu.component';
import { HeaderComponent } from './header/header.component';
import { ErrorComponent } from './error/error.component';


@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    declarations: [
        MenuComponent,
        HeaderComponent,
        ErrorComponent
    ],
    exports: [
        MenuComponent,
        HeaderComponent,
        ErrorComponent,
    ]
})
export class SharedModule {}
