import { Component } from '@angular/core';
import { Color } from '../enums/Color';
import { Collection } from './collection';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

  companyName: string = 'РумТибет';

  constructor() {
    this.saveLastVisitDate();
    this.saveVisitCount();

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

  isPrimaryColor(color: Color): boolean {
    return color === Color.RED || color === Color.GREEN || color === Color.BLUE;
  }

  saveLastVisitDate(): void {
    const date: Date = new Date();

    localStorage.setItem('lastVisit', date.toISOString());
  }

  saveVisitCount(): void {
    const visitCount: number = Number(
      localStorage.getItem('visitCount')
    );

    localStorage.setItem('visitCount', String(visitCount + 1));
  }

}