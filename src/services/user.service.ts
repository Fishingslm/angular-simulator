import { Injectable, inject } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  catchError,
  defer,
  finalize,
  of,
  tap,
} from 'rxjs';
import { IUser } from '../interfaces/IUser';
import { LoaderService } from './loader.service';
import { MessageService } from './message.service';
import { UserApiService } from './user-api.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private userApiService: UserApiService = inject(UserApiService);
  private loaderService: LoaderService = inject(LoaderService);
  private messageService: MessageService = inject(MessageService);

  private usersSubject: BehaviorSubject<IUser[]> =
    new BehaviorSubject<IUser[]>([]);

  setUsers(users: IUser[]): void {
    this.usersSubject.next(users);
  }

  getUsers(): Observable<IUser[]> {
    return this.usersSubject.asObservable();
  }

  loadUsers(): Observable<IUser[]> {
    return defer((): Observable<IUser[]> => {
      this.loaderService.showLoader();

      return this.userApiService.getUsers();
    })
      .pipe(
        catchError((): Observable<IUser[]> => {
          this.messageService.showError('Не удалось загрузить пользователей.');

          return of<IUser[]>([]);
        }),
        tap((users: IUser[]): void => {
          this.setUsers(users);
        }),
        finalize((): void => {
          this.loaderService.hideLoader();
        }),
      );
  }

}