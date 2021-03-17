import { Component, OnInit, Input } from '@angular/core';
import { Channel } from '../../interfaces/channel';

@Component({
  selector: 'app-side-menu-container',
  templateUrl: './side-menu-container.component.html',
  styleUrls: ['./side-menu-container.component.css']
})

export class SideMenuContainerComponent implements OnInit {
  
  @Input() selectedChannel: Channel = {
    name: '',
    id: -1,
  };
  @Input() userName: string = '';
  @Input() channels: Channel[] = [];

  constructor() {
  }

  ngOnInit(): void {
    
  }

}
