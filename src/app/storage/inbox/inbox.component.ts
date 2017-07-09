import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { InboxService } from '../../api';


import { InboxItem } from './inboxItem';
import { InboxMessage } from './inboxMessage';
import { MaskItem } from './maskItem';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss']
})

export class InboxComponent implements OnInit {
  filter: string = '';
  public messages: InboxItem[] = new Array<InboxItem>();
  public masks: MaskItem[] = new Array<MaskItem>();
  public selectedId = new Subject<string>();
  public selectedMessage: any = null;
  public messageSelected: boolean = false;
  public numUnreadedInInbox: number = 0;
  public startIndex: number = 0;


  public errorMessage: string = '';

  constructor(private dataService: InboxService) {

  };

  ngOnInit() {

    this.getNumUnreadedMessages();

    this.getInbox();

    this.selectedId.subscribe((id) => {
      this.dataService.getMessageView(id)
      .subscribe(message => {
        this.selectedMessage = new InboxMessage(message);
        this.messageSelected = true;
      });
    });
  }

  onFilterChange(in_Filter: string) {
    this.startIndex = 0;
    this.getInbox({
      filter: in_Filter,
      startIndex: this.startIndex
    });
  }

  onPrevPage() {
    if (this.startIndex > 100) {
      this.startIndex -= 100;
    } else {
      this.startIndex = 0;
    }

    this.getInbox({
      filter: this.filter,
      startIndex: this.startIndex
    });
  }

  onRefresh() {

    this.startIndex = 0;
    this.getInbox({
      filter: this.filter,
      startIndex: this.startIndex
    });
  }

  onNextPage() {
    this.startIndex += 100;

    this.getInbox({
      filter: this.filter,
      startIndex: this.startIndex
    });
  }

  onMessageClick(in_Id: string) {
    this.selectedId.next(in_Id);
  }

  onMessageDelete(in_Id: string) {
    this.dataService.removeItem({ids: [in_Id]})
    .subscribe(
        result => {
          let i: number;
          for (i = 0; i < this.messages.length; i++) {
            if (this.messages[i].id  === in_Id) {
              this.messages.splice(i, 1);
              this.onMessageClick(this.messages[i + 1].id);
              break;
            }
          }
        },
        error =>  this.errorMessage = <any>error
    );
  }

  getNumUnreadedMessages() {
    this.dataService.getNumUnreadedMessages()
    .subscribe(
        count => {
          this.numUnreadedInInbox = count;
        },
        error =>  this.errorMessage = <any>error
    );
  }

  getInbox(in_Params = undefined) {
    this.dataService.getInbox(in_Params)
    .subscribe(
        items => {
          this.messages.splice(0, this.messages.length);
          for (let item of items) {
            this.messages.push(new InboxItem(item));
          }
        },
        error =>  this.errorMessage = <any>error
    );
  }
}
