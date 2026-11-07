import { Injectable } from '@angular/core';
import { IMessage } from '../interfaces/IMessage';
import { MessageType } from '../enums/MessageType';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {

  private messagesSubject: BehaviorSubject<IMessage[]> =
    new BehaviorSubject<IMessage[]>([]);

  messages$: Observable<IMessage[]> = this.messagesSubject.asObservable();
  private nextId: number = 1;

  showSuccess(text: string): void {
    this.addMessage(text, MessageType.SUCCESS);
  }

  showError(text: string): void {
    this.addMessage(text, MessageType.ERROR);
  }

  showWarn(text: string): void {
    this.addMessage(text, MessageType.WARN);
  }

  showInfo(text: string): void {
    this.addMessage(text, MessageType.INFO);
  }

  closeMessage(id: number): void {
    this.messagesSubject.next(
      this.messagesSubject.value.filter(
        (message: IMessage): boolean => message.id !== id
      )
    );
  }

  private addMessage(text: string, type: MessageType): void {
    const newMessage: IMessage = {
      id: this.nextId,
      text: text,
      type: type,
    };

    this.nextId += 1;

    this.messagesSubject.next([
      newMessage,
      ...this.messagesSubject.value,
    ]);
    window.setTimeout((): void => {
      this.closeMessage(newMessage.id);
    }, 5000);
  }

}