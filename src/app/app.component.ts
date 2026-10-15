import { FormsModule } from '@angular/forms';
import { Component, OnDestroy } from '@angular/core';
import { Color } from '../enums/Color';
import { Collection } from './collection';
import { IAdvantage } from '../interfaces/IAdvantage';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})

export class AppComponent implements OnDestroy {

  companyName: string = 'РумТибет';
  selectedLocation: string = '';
  selectedDate: string = '';
  selectedParticipants: string = '';
  currentTime: string = new Date().toLocaleString('ru-RU').replace(',', '');
  clickCount: number = 0;
  showClock: boolean = true;
  liveText: string = '';
  isLoading: boolean = true;
  advantages: IAdvantage[] = [
    {
      id: 1,
      icon: 'guide',
      title: 'Опытный гид',
      description:
        'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
    },
    {
      id: 2,
      icon: 'safety',
      title: 'Безопасный поход',
      description:
        'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
    },
    {
      id: 3,
      icon: 'price',
      title: 'Лояльные цены',
      description:
        'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
    },
  ];
  offerImages: string[] = [
    'offer-lake',
    'offer-hiker',
    'offer-snowmobile',
    'offer-valley',
  ];

  private clockIntervalId: number | undefined;
  private loadingTimeoutId: number | undefined;

  constructor() {
    this.saveLastVisitDate();
    this.saveVisitCount();
    this.startClock();
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
    window.clearInterval(this.clockIntervalId);
    window.clearTimeout(this.loadingTimeoutId);
  }

  private startClock(): void {
    this.clockIntervalId = window.setInterval((): void => {
      this.currentTime = new Date().toLocaleString('ru-RU').replace(',', '');
    }, 1000);
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

    localStorage.setItem('lastVisit', date.toISOString());
  }

  private saveVisitCount(): void {
    const visitCount: number = Number(
      localStorage.getItem('visitCount')
    );

    localStorage.setItem('visitCount', String(visitCount + 1));
  }

}