import { Injectable, EventEmitter } from '@angular/core';

// inport message codes
import { MessageCodes } from '../common/enum/message-codes.enum';


// generic message class that can be both simple and complex if required
export class MessageInformation{
    constructor(public messageType: MessageCodes, public name: string, public details: any, public extra?: any[]){

    }
}


@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  public broadcastMessage: EventEmitter<MessageInformation>;
  public requestFrameOpenMessage: EventEmitter<MessageInformation>;
  public requestDetailOpenMessage: EventEmitter<MessageInformation>;

  constructor() { 
        this.broadcastMessage = new EventEmitter<MessageInformation>();
        this.requestFrameOpenMessage = new EventEmitter<MessageInformation>();
        this.requestDetailOpenMessage = new EventEmitter<MessageInformation>();

  }

  public broadcastShout(message: MessageInformation): void{
      this.broadcastMessage.emit(message);
  }

  public frameOpenRequest(message: MessageInformation): void{
      this.requestFrameOpenMessage.emit(message);
  }

  public detailOpenRequest(message: MessageInformation): void{
      this.requestDetailOpenMessage.emit(message);
  }
}
