import { Component, OnInit, AfterViewInit, Output, EventEmitter, Input, ViewChild, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { Message } from '../../interfaces/message';
import { Channel } from '../../interfaces/channel';

@Component({
  selector: 'app-chat-box-container',
  templateUrl: './chat-box-container.component.html',
  styleUrls: ['./chat-box-container.component.css']
})
export class ChatBoxContainerComponent implements OnInit, AfterViewInit {
  inputMessage = '';  
  
  @Input() users: string[] = [];
  @Input() messages: Message[] = [];
  @Input() userName: string = '';
  @Input() selectedChannel: Channel = {
    name: '',
    id: -1,
  };
  @Output() sendMessageEvent: EventEmitter<any> = new EventEmitter();
  @ViewChild('scrollMe', {static: false}) private myChatContainer?: ElementRef;
  @ViewChildren('message') messageElements?: QueryList<any>;

  constructor() {    
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
