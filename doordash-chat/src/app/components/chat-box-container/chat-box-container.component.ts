import { Component, OnInit, AfterViewInit, Output, EventEmitter, Input, ViewChild, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { getSelectedChannel, getChannels, getUserName } from '../../shared/store-selector';
import { Message } from '../../interfaces/message';
import { Channel } from '../../interfaces/channel';
import { StoreActionsService } from 'src/app/shared/services/store-actions.service';

@Component({
  selector: 'app-chat-box-container',
  templateUrl: './chat-box-container.component.html',
  styleUrls: ['./chat-box-container.component.css']
})
export class ChatBoxContainerComponent implements OnInit, AfterViewInit {
  inputMessage = '';
  messages: Message[] = [];
  selectedChannel: Channel = {
    name: '',
    id: -1,
    users: [],
    messages: [],
  };
  channels: Channel[] = [];
  userName: string = '';
  @Output() sendMessageEvent: EventEmitter<any> = new EventEmitter();
  @ViewChild('scrollMe', {static: false}) private myChatContainer?: ElementRef;
  @ViewChildren('message') messageElements?: QueryList<any>;

  constructor(private _store: Store<any>, private storeActionsService: StoreActionsService) {
    this._store.pipe(select(getSelectedChannel)).subscribe(selectedChannel => {
      this.selectedChannel = selectedChannel;
      this.getMessagesFromSelectedChannel();
    });
    this._store.pipe(select(getChannels)).subscribe(channels => {
      this.channels = channels;
      if (this.selectedChannel) {
        this.updateSelectedChannel();
      }
    });
    this._store.pipe(select(getUserName)).subscribe(userName => {
      if (userName) this.userName = userName;
    });
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    if (this.messageElements) {
      this.messageElements.changes.subscribe(_ => this.onMessageElementsChanged()); 
    }
  }

  onMessageKeyUp(event: any) {
    if (event.keyCode === 13 && this.inputMessage) {
      event.preventDefault();
      this.sendMessage();
      this.inputMessage = '';
    }
  }

  onMessageSend() {
    if (this.inputMessage) {
      this.sendMessage();
      this.inputMessage = '';
    }
  }

  sendMessage() {
    this.sendMessageEvent.emit(this.inputMessage);
  }

  updateSelectedChannel() {
    const selectedChannel = this.channels.filter(channel => channel.id === this.selectedChannel.id);
    this.storeActionsService.updateSelectedChannel(selectedChannel[0]);
  }
  getMessagesFromSelectedChannel() {
    this.messages = this.selectedChannel.messages;
  }

  onMessageElementsChanged() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      if (this.myChatContainer)
        this.myChatContainer.nativeElement.scroll({
          top: this.myChatContainer.nativeElement.scrollHeight,
          behavior: 'smooth'
        });;
    } catch(err) { }                 
}
}
