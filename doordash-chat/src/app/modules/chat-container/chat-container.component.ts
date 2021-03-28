import { Component, OnInit } from '@angular/core';
import { io } from 'socket.io-client';
import { StoreActionsService } from '../../shared/services/store-actions.service';
import { Channel } from '../../interfaces/channel';
import { SOCKET_ENDPOINT } from 'src/environments/environment';
import { Store, select } from '@ngrx/store';
import { getUserName, getSelectedChannel, getChannels, getChannelsData, getSelectedChannelData } from '../../shared/store-selector';
import { SocketioMessageService } from 'src/app/shared/services/socketio-message.service';
import { Message } from '../../interfaces/message';
import { MessageService } from 'src/app/shared/services/message.service';
import { ChannelData } from '../../interfaces/channel-data';

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
  };
  channelsData: ChannelData[] = [];
  channels: Channel[] = [];
  selectedChannelData: ChannelData = {
    channel: {
      id: -1,
      name: ''
    },
    messages: [],
    users: []
  };
  constructor(private storeActionsService: StoreActionsService,
          private messageService: MessageService, private _store: Store,
          private socketioMessageService: SocketioMessageService) {
      this._store.pipe(select(getUserName)).subscribe(userName => {
        if (userName) this.userName = userName;
      });
      this._store.pipe(select(getChannelsData)).subscribe(channelsData => {
        if (channelsData) {
          this.channelsData = channelsData;
          this.updateSelectedChannelData();
        }
      });
      this._store.pipe(select(getSelectedChannelData)).subscribe(selectedChannelData => {
        if (selectedChannelData) {
          this.selectedChannelData = selectedChannelData;
        };
      });
      this._store.pipe(select(getSelectedChannel)).subscribe(selectedChannel => {
        if (selectedChannel) {
          this.selectedChannel = selectedChannel;
          this.getChannelInformation(this.selectedChannel.id);
        };
      })
      this._store.pipe(select(getChannels)).subscribe(channels => {
        if (channels) this.channels = channels;
      });
  }

  ngOnInit(): void {
    this.userName = sessionStorage.getItem('userName') || 'Sai Kiran Karipe';
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
    this.messageService.getRooms().subscribe((channels: any) => {
      this.storeActionsService.updateChannels(channels);
      this.storeActionsService.updateSelectedChannel(channels[0]);
      channels.forEach((channel: Channel) => {
        this.getChannelInformation(channel.id);
      });
    });  
  }

  getChannelInformation(channelId: any) {
    this.messageService.getChannelInformation(channelId).subscribe((room: any) => {
      const firstName = this.userName.split(' ');
      let users: string[] = [];
      if (room[0].users.indexOf(firstName[0]) < 0) {
        users = [firstName[0], ...room[0].users];
      }      
      const channelData: ChannelData = {
        channel: {
          id: room[0].id,
          name: room[0].name,
        },
        messages: room[1],
        users: users
      }
      this.updateChannelsData(channelData);
    });
  }

  updateChannelsData(channelData: ChannelData) {
    this.storeActionsService.updateChannelsData(channelData);
  }

  updateSelectedChannelData() { 
    for (let i = 0; i < this.channelsData.length; i++) {
      if (this.channelsData[i].channel.id === this.selectedChannel.id) {
        this.selectedChannelData = this.channelsData[i];
        break;
      }
    }
    this.storeActionsService.updateSelectedChannelsData(this.selectedChannelData);
  }
}
