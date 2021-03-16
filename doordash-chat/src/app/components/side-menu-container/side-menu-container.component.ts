import { Component, OnInit, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Channel } from '../../interfaces/channel';
import { getChannels, getSelectedChannel } from '../../shared/store-selector';

@Component({
  selector: 'app-side-menu-container',
  templateUrl: './side-menu-container.component.html',
  styleUrls: ['./side-menu-container.component.css']
})

export class SideMenuContainerComponent implements OnInit {
  channels: Channel[] = [];
  selectedChannel: Channel = {
    name: '',
    id: -1,
    users: [],
    messages: [],
  };
  @Input() userName: string = '';

  constructor(private _store: Store) {
    this._store.pipe(select(getChannels)).subscribe(channels => {
      this.channels = channels;
    });
    this._store.pipe(select(getSelectedChannel)).subscribe(selectedChannel => {
      this.selectedChannel = selectedChannel;
      console.log(this.selectedChannel);
    });
  }

  ngOnInit(): void {
    
  }

}
