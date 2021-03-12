import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-channels-component',
  templateUrl: './channels-component.component.html',
  styleUrls: ['./channels-component.component.css']
})
export class ChannelsComponentComponent implements OnInit {
  channels = ['Analytics', 'Business', 'Design', 'Engineering', 'HR', 'Operations', 'Special Ops'];
  constructor() { }

  ngOnInit(): void {
  }

}
