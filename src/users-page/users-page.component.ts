import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Observable, asapScheduler, subscribeOn } from 'rxjs';
import { IUser } from '../interfaces/IUser';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-users-page',
  imports: [AsyncPipe],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss',
})
export class UsersPageComponent {

  private userService: UserService = inject(UserService);

  users$: Observable<IUser[]> = this.userService.loadUsers()
    .pipe(
      subscribeOn(asapScheduler),
    );

}