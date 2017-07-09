import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InboxComponent } from './inbox.component';
import inboxRoutes from './inbox.routes';
import { InboxService } from '../../api';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    inboxRoutes,
    FormsModule
  ],
  declarations: [InboxComponent],
  providers: [InboxService]
})
export default class InboxModule { }
