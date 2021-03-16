import { Component, OnInit } from '@angular/core';
import { io } from 'socket.io-client';
import { StoreActionsService } from '../../shared/services/store-actions.service';
import { ChannelsMock } from '../../mock/channels-mock';
import { Channel } from '../../interfaces/channel';
import { SOCKET_ENDPOINT } from 'src/environments/environment';
import { Store, select } from '@ngrx/store';
import { getUserName, getSelectedChannel } from '../../shared/store-selector';
import { SocketioMessageService } from 'src/app/shared/services/socketio-message.service';
import { Message } from '../../interfaces/message';

@Component({
  selector: 'app-chat-container',
  templateUrl: './chat-container.component.html',
  styleUrls: ['./chat-container.component.css']
})
export class ChatContainerComponent implements OnInit {
  socket: any;
  userName: string = '';
  selectedChannel: Channel = {
    name: '',
    id: -1,
    users: [],
    messages: [],
  };

  constructor(private storeActionsService: StoreActionsService,
          private channelsMock:ChannelsMock, private _store: Store,
          private socketioMessageService: SocketioMessageService) {
      this._store.pipe(select(getUserName)).subscribe(userName => {
        if (userName) this.userName = userName;
      });
      this._store.pipe(select(getSelectedChannel)).subscribe(selectedChannel => {
        if (selectedChannel) this.selectedChannel = selectedChannel;
      })
  }

  ngOnInit(): void {
    this.userName = sessionStorage.getItem('userName') || '';
    this.storeActionsService.updateUserName(this.userName);
    this.getChannels();
    this.setupSocketConnection();
  }

  setupSocketConnection() {
    this.socket = io(SOCKET_ENDPOINT);
    this.socket.on('message-broadcast', (message: Message) => {
      if (message) {
        this.socketioMessageService.updateIncomingSocketMessages(message);
      }
    });
  }

  sendMessage(message: string) {
    const socketMessage: Message = {
      name: this.userName,
      message: message,
      type: 'new',
      id: Math.random().toString(),
      channel_id: this.selectedChannel.id
    }
    this.socket.emit('message', socketMessage);
    this.socketioMessageService.updateIncomingSocketMessages(socketMessage);
  }

  getChannels() {
    const channels: Channel[] = this.channelsMock.getChannels();
    this.storeActionsService.updateChannels(channels);
    this.storeActionsService.updateSelectedChannel(channels[0]);
    this.storeActionsService.updateUsersInChannels(this.userName);
  }
}
