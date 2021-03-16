import { Component, OnInit } from '@angular/core';
import { StoreActionsService } from 'src/app/shared/services/store-actions.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-join-user',
  templateUrl: './join-user.component.html',
  styleUrls: ['./join-user.component.css']
})
export class JoinUserComponent implements OnInit {
  userName: string = '';
  constructor(private storeActionsService: StoreActionsService, private _router: Router) { }

  ngOnInit(): void {
  }

  onUserName() {
    this.storeActionsService.updateUserName(this.userName);
    this._router.navigate(['/doordash-chat']);
    sessionStorage.setItem('userName', this.userName);
  }
}
