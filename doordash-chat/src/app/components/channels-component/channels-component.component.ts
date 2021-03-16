import { Component, OnInit, Input } from '@angular/core';
import { StoreActionsService } from '../../shared/services/store-actions.service';
import { Channel } from '../../interfaces/channel';

@Component({
  selector: 'app-channels-component',
  templateUrl: './channels-component.component.html',
  styleUrls: ['./channels-component.component.css']
})
export class ChannelsComponentComponent implements OnInit {
  @Input() channels: Channel[] = [];
  @Input() selectedChannel: Channel = {
    name: '',
    id: -1,
    users: [],
    messages: [],
  };
  constructor(private storeActionsService: StoreActionsService) { }

  ngOnInit(): void {
  }

  onChannelSelect(channel: any) {
    this.storeActionsService.updateSelectedChannel(channel);
  }
}
