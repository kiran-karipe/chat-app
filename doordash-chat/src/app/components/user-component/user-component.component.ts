import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-component',
  templateUrl: './user-component.component.html',
  styleUrls: ['./user-component.component.css']
})
export class UserComponentComponent implements OnInit {
  @Input() userName: string = '';
  constructor() { }

  ngOnInit(): void {
  }

}
