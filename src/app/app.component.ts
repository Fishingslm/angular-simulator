import { Component } from '@angular/core';
import './training';
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
    console.log('Красный:', this.isPrimaryColor(Color.RED));
    console.log('Зелёный:', this.isPrimaryColor(Color.GREEN));
    console.log('Синий:', this.isPrimaryColor(Color.BLUE));
    console.log('Жёлтый:', this.isPrimaryColor(Color.YELLOW));
    console.log('Чёрный:', this.isPrimaryColor(Color.BLACK));

    const numberCollection: Collection<number> = new Collection<number>(
      [10, 20, 30]
    );

    const textCollection: Collection<string> = new Collection<string>(
      ['Чай', 'Кофе', 'Лимонад']
    );

    console.log('Коллекция чисел:', numberCollection.getAll());
    console.log('Коллекция строк:', textCollection.getAll());
    console.log('Второе число:', numberCollection.getItem(1));
    console.log('Первый напиток:', textCollection.getItem(0));
    console.log('Несуществующий элемент:', numberCollection.getItem(99));

    numberCollection.removeItem(1);
    textCollection.removeItem(1);

    console.log('Числа после удаления:', numberCollection.getAll());
    console.log('Строки после удаления:', textCollection.getAll());

    numberCollection.replaceItem(0, 100);
    textCollection.replaceItem(0, 'Матча');

    console.log('Числа после замены:', numberCollection.getAll());
    console.log('Строки после замены:', textCollection.getAll());

    numberCollection.clear();
    textCollection.clear();

    console.log('Числа после очистки:', numberCollection.getAll());
    console.log('Строки после очистки:', textCollection.getAll());
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