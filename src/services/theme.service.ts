import { DOCUMENT, Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, distinctUntilChanged, map } from 'rxjs';
import { ColorMode } from '../enums/ColorMode';
import { Theme } from '../enums/Theme';
import { IThemeState } from '../interfaces/IThemeState';
import { StorageService } from './storage.service';
import { usePreset } from '@primeuix/themes';
import { Preset } from '@primeuix/themes/types';
import Aura from '@primeuix/themes/aura';
import Nora from '@primeuix/themes/nora';
import Lara from '@primeuix/themes/lara';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {

  private readonly THEME_STORAGE_KEY: string = 'theme-state';
  private readonly storageService: StorageService = inject(StorageService);
  private readonly document: Document = inject(DOCUMENT);
  private readonly themePresets: Record<Theme, Preset> = {
    [Theme.AURA]: Aura,
    [Theme.NORA]: Nora,
    [Theme.LARA]: Lara,
  };
  private readonly defaultState: IThemeState = {
    theme: Theme.AURA,
    colorMode: ColorMode.LIGHT,
  };

  private readonly stateSubject: BehaviorSubject<IThemeState> =
    new BehaviorSubject<IThemeState>(
      this.storageService.getItem<IThemeState>(this.THEME_STORAGE_KEY) ?? this.defaultState
    );

  readonly state$: Observable<IThemeState> = this.stateSubject.asObservable();

  constructor() {
    this.state$.subscribe((state: IThemeState): void => {
      this.document.documentElement.classList.toggle(
        'app-dark',
        state.colorMode === ColorMode.DARK,
      );
    });

    this.state$.pipe(
      map((state: IThemeState): Theme => state.theme),
      distinctUntilChanged(),
    ).subscribe((theme: Theme): void => {
      usePreset(this.themePresets[theme]);
    });
  }

  setTheme(theme: Theme): void {
    this.updateState({ ...this.stateSubject.value, theme });
  }

  setColorMode(colorMode: ColorMode): void {
    this.updateState({ ...this.stateSubject.value, colorMode });
  }

  private updateState(state: IThemeState): void {
    this.storageService.setItem<IThemeState>(this.THEME_STORAGE_KEY, state);
    this.stateSubject.next(state);
  }

}