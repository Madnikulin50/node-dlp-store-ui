import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StorageComponent } from './storage.component';
import storageRoutes from './storage.routes';
import { TopNavModule, SidebarModule } from '../shared/index';

@NgModule({
  imports: [
    CommonModule,
    storageRoutes,
    TopNavModule,
    SidebarModule
  ],
  declarations: [StorageComponent]
})
export default class StorageModule { }
