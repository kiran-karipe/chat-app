import { Component, OnInit } from '@angular/core';
import { io } from 'socket.io-client';
import { StoreActionsService } from '../../shared/services/store-actions.service';
// const SOCKET_ENDPOINT = 'localhost:3000';
@Component({
  selector: 'app-chat-container',
  templateUrl: './chat-container.component.html',
  styleUrls: ['./chat-container.component.css']
})
export class ChatContainerComponent implements OnInit {
  socket: any;
  constructor(private storeActionsService: StoreActionsService) { }

  ngOnInit(): void {
    this.setupSocketConnection();
  }

  setupSocketConnection() { 
    this.socket = io('http://localhost:3000');
    this.socket.on('message-broadcast', (data: string) => {
      if (data) {
        this.storeActionsService.updateIncomingMessages(data);
        console.log("this is data: " + data);
      }
    });
    console.log(this.socket);
  }

  sendMessage(message: any) {
    this.socket.emit('message', message);
  }

}
