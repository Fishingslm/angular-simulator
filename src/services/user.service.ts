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
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private userApiService: UserApiService = inject(UserApiService);
  private loaderService: LoaderService = inject(LoaderService);
  private messageService: MessageService = inject(MessageService);
  private storageService: StorageService = inject(StorageService);
  private readonly USERS_STORAGE_KEY: string = 'users';

  private usersSubject: BehaviorSubject<IUser[]> =
    new BehaviorSubject<IUser[]>([]);

  setUsers(users: IUser[]): void {
    this.storageService.setItem<IUser[]>(this.USERS_STORAGE_KEY, users);
    this.usersSubject.next(users);
  }

  getUsers(): Observable<IUser[]> {
    return this.usersSubject.asObservable();
  }

  deleteUser(id: number): void {
    const updatedUsers: IUser[] = this.usersSubject.value.filter(
      (user: IUser): boolean => user.id !== id,
    );

    this.setUsers(updatedUsers);
  }

  addUser(user: IUser): void {
    this.setUsers([user, ...this.usersSubject.value]);
  }

  loadUsers(): Observable<IUser[]> {
    return defer((): Observable<IUser[]> => {
      const savedUsers: IUser[] | null =
        this.storageService.getItem<IUser[]>(this.USERS_STORAGE_KEY);

      if (savedUsers !== null) {
        this.usersSubject.next(savedUsers);

        return of(savedUsers);
      }

      this.loaderService.showLoader();

      return this.userApiService.getUsers()
        .pipe(
          tap((users: IUser[]): void => {
            this.setUsers(users);
          }),
          catchError((): Observable<IUser[]> => {
            this.messageService.showError('Не удалось загрузить пользователей.');
            this.usersSubject.next([]);

            return of<IUser[]>([]);
          }),
          finalize((): void => {
            this.loaderService.hideLoader();
          }),
        );
    });
  }

}