import { Component, inject, OnDestroy } from '@angular/core';
import { Color } from '../enums/Color';
import { Collection } from './collection';
import { StorageService } from '../services/storage.service';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { MessageComponent } from '../message/message.component';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, FooterComponent, RouterOutlet, MessageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})

export class AppComponent implements OnDestroy {

  private storageService: StorageService = inject(StorageService);

  isLoading: boolean = true;

  private loadingTimeoutId: number | undefined;

  constructor() {
    this.saveLastVisitDate();
    this.saveVisitCount();
    this.startLoading();

    const numberCollection: Collection<number> = new Collection<number>(
      [10, 20, 30]
    );

    const textCollection: Collection<string> = new Collection<string>(
      ['Чай', 'Кофе', 'Лимонад']
    );

    numberCollection.removeItem(1);
    textCollection.removeItem(1);

    numberCollection.replaceItem(0, 100);
    textCollection.replaceItem(0, 'Матча');

    numberCollection.clear();
    textCollection.clear();

  }

  ngOnDestroy(): void {
    window.clearTimeout(this.loadingTimeoutId);
  }

  private startLoading(): void {
    this.loadingTimeoutId = window.setTimeout((): void => {
      this.isLoading = false;
    }, 2000);
  }

  private isPrimaryColor(color: Color): boolean {
    return color === Color.RED || color === Color.GREEN || color === Color.BLUE;
  }

  private saveLastVisitDate(): void {
    const date: Date = new Date();

    this.storageService.setItem<string>('lastVisit', date.toISOString());
  }

  private saveVisitCount(): void {
    const visitCount: number =
      this.storageService.getItem<number>('visitCount') ?? 0;

    this.storageService.setItem<number>('visitCount', visitCount + 1);
  }

}