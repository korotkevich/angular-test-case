import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { InventoryComponent } from './inventory.component';

const routes: Routes = [
    {path: '', component: InventoryComponent}
];

@NgModule({
    declarations: [
        InventoryComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ]
})
export class InventoryModule {}
