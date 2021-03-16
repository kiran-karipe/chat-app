import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-session',
  templateUrl: './user-session.component.html',
  styleUrls: ['./user-session.component.css']
})
export class UserSessionComponent implements OnInit {
  timer: any;
  count = 0;
  constructor() { }

  ngOnInit(): void {
    clearInterval(this.timer);
    this.startSession();
  }

  startSession() {
    this.timer = setInterval(() => {
      this.setCount(); 
    }, 1000 * 60);
  }

  setCount() {
    this.count++;
  }
}
