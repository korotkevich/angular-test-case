import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { BillingComponent } from './billing.component';

const routes: Routes = [
    {path: '', component: BillingComponent}
];

@NgModule({
    declarations: [
        BillingComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ],
})
export class BillingModule {}
