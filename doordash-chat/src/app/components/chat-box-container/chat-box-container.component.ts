import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { getIncomingMessages } from '../../shared/store-selector';
import { Message } from '../../interfaces/message';

@Component({
  selector: 'app-chat-box-container',
  templateUrl: './chat-box-container.component.html',
  styleUrls: ['./chat-box-container.component.css']
})
export class ChatBoxContainerComponent implements OnInit {
  inputMessage = '';
  messages: Message[] = [];
  @Output() sendMessageEvent: EventEmitter<any> = new EventEmitter();
  constructor(private _store: Store<any>) {
    this._store.pipe(select(getIncomingMessages)).subscribe(incomingMessages => {
      this.messages = incomingMessages;
    })
  }

  ngOnInit(): void {
  }

  onMessageKeyUp(event: any) {
    if (event.keyCode === 13) {
      event.preventDefault();
      this.sendMessage();
      this.inputMessage = '';
    }
  }

  onMessageSend() {
    this.inputMessage = '';
  }

  sendMessage() {
    const message: Message = {
      name: '',
      message: this.inputMessage,
      id: '1',
      isLoggedUser: true
    }
    this.sendMessageEvent.emit(message);
  }
}
