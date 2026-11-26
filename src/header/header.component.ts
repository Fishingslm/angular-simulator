import { Component, OnDestroy, inject } from '@angular/core';
import { INavigationItem } from '../interfaces/INavigationItem';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { ColorMode } from '../enums/ColorMode';
import { ThemeService } from '../services/theme.service';
import { SelectButtonModule } from 'primeng/selectbutton';
import { Theme } from '../enums/Theme';
import { Observable } from 'rxjs';
import { IThemeState } from '../interfaces/IThemeState';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, AsyncPipe, FormsModule, ToggleSwitchModule, FontAwesomeModule, SelectButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnDestroy {

  private readonly themeService: ThemeService = inject(ThemeService);
  readonly themeState$: Observable<IThemeState> = this.themeService.state$;
  readonly colorModes: typeof ColorMode = ColorMode;
  readonly sunIcon: IconDefinition = faSun;
  readonly moonIcon: IconDefinition = faMoon;
  readonly themeOptions: { label: string; value: Theme }[] = [
    { label: 'Aura', value: Theme.AURA },
    { label: 'Nora', value: Theme.NORA },
    { label: 'Lara', value: Theme.LARA },
  ];
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

  setDarkMode(checked: boolean): void {
    this.themeService.setColorMode(checked ? ColorMode.DARK : ColorMode.LIGHT);
  }

  setTheme(theme: Theme): void {
    this.themeService.setTheme(theme);
  }

  private startClock(): void {
    this.clockIntervalId = window.setInterval((): void => {
      this.currentTime = new Date().toLocaleString('ru-RU').replace(',', '');
    }, 1000);
  }

}