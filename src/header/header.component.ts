import { Component, OnDestroy } from '@angular/core';
import { INavigationItem } from '../interfaces/INavigationItem';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnDestroy {

  companyName: string = 'РумТибет';
  navigationItems: INavigationItem[] = [
    {
      id: 1,
      title: 'Главная',
      path: '/',
    },
    {
      id: 2,
      title: 'Пользователи',
      path: '/users',
    },
  ];
  currentTime: string = new Date().toLocaleString('ru-RU').replace(',', '');
  clickCount: number = 0;
  showClock: boolean = true;

  private clockIntervalId: number | undefined;

  constructor() {
    this.startClock();
  }

  ngOnDestroy(): void {
    window.clearInterval(this.clockIntervalId);
  }

  private startClock(): void {
    this.clockIntervalId = window.setInterval((): void => {
      this.currentTime = new Date().toLocaleString('ru-RU').replace(',', '');
    }, 1000);
  }

}