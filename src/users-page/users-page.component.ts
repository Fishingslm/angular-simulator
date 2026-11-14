import { AsyncPipe } from '@angular/common';
import { afterNextRender, Component, DestroyRef, inject } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';
import { IUser } from '../interfaces/IUser';
import { UserService } from '../services/user.service';
import { UserCardComponent } from '../user-card/user-card.component';
import { UserCreateComponent } from '../user-create/user-create.component';
import { UsersFilterComponent } from '../users-filter/users-filter.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-users-page',
  imports: [AsyncPipe, UserCardComponent, UserCreateComponent, UsersFilterComponent],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss',
})
export class UsersPageComponent {

  private userService: UserService = inject(UserService);
  private destroyRef: DestroyRef = inject(DestroyRef);
  private searchSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  users$: Observable<IUser[]> = this.userService.getUsers();

  filteredUsers$: Observable<IUser[]> = combineLatest([this.users$, this.searchSubject])
    .pipe(
      map(([users, query]: [IUser[], string]): IUser[] => {
        return users.filter((user: IUser): boolean => {
          const name: string = user.name.trim().toLowerCase();
          return name.includes(query);
        });
      }),
    );

  constructor() {
    afterNextRender((): void => {
      this.userService.loadUsers()
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe();
    });
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id);
  }

  createUser(user: IUser): void {
    this.userService.addUser(user);
  }

  setSearchQuery(query: string): void {
    this.searchSubject.next(query);
  }

}