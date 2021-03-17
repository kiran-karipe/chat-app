import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SOCKET_ENDPOINT } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { forkJoin } from '../../../../node_modules/rxjs';
@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) { }

  getRooms() {
    return this.http.get(SOCKET_ENDPOINT + '/rooms');
  }

  // getRoomsResponse() {
  //   this.getRoomWithId(room.id).subscribe((room) => {

  //   });
  //   this.getMessages(room.id);
  // }

  getRoomInformation(roomId: any) {
    const getRoomUsers = this.getRoom(roomId);
    const getRoomMessages = this.getMessages(roomId);

    return forkJoin([getRoomUsers, getRoomMessages]);
  }

  getRoom(roomId: any) {
    return this.http.get(SOCKET_ENDPOINT + '/rooms/' + roomId);
  }

  getMessages(roomId: any) {
    return this.http.get(SOCKET_ENDPOINT + '/rooms/' + roomId + '/messages');
  }
}
