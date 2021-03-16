import { Injectable } from '@angular/core';
import { Message } from '../../interfaces/message';
import { StoreActionsService } from './store-actions.service';

@Injectable({
  providedIn: 'root'
})
export class SocketioMessageService {

  constructor(private storeActionsService: StoreActionsService) { }

  updateIncomingSocketMessages(message: Message) {
    if (message.type === 'new') {
      this.storeActionsService.addNewMessage(message);
    }
  }
}
