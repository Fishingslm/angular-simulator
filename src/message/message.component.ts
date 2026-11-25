import { Component, inject } from '@angular/core';
import { MessageService } from '../services/message.service';
import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faCircleInfo, faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-message',
  imports: [AsyncPipe, NgTemplateOutlet, FontAwesomeModule],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
})
export class MessageComponent {

  messageService: MessageService = inject(MessageService);
  readonly messageIcon: IconDefinition = faCircleInfo;
  readonly closeIcon: IconDefinition = faXmark;

}