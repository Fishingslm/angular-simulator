import { Component, EventEmitter, Output, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { IUser } from '../interfaces/IUser';

type FormControls<T> = {
  [K in keyof T]: T[K] extends object
    ? FormGroup<FormControls<T[K]>>
    : FormControl<T[K]>;
};

type UserFormValue = Omit<IUser, 'id'> & { id: string };

@Component({
  selector: 'app-user-create',
  imports: [ReactiveFormsModule],
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.scss',
})
export class UserCreateComponent {

  @Output() createUser: EventEmitter<IUser> = new EventEmitter<IUser>();

  private formBuilder: NonNullableFormBuilder = inject(NonNullableFormBuilder);

  userForm: FormGroup<FormControls<UserFormValue>> = this.formBuilder.group({
    id: '',
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
    phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(25)]],
    website: ['', Validators.maxLength(100)],

    address: this.formBuilder.group({
      city: ['', [Validators.required, Validators.maxLength(50)]],
      street: ['', [Validators.required, Validators.maxLength(100)]],
      suite: ['', Validators.maxLength(50)],
      zipcode: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      geo: this.formBuilder.group({
        lat: ['', Validators.required],
        lng: ['', Validators.required],
      }),
    }),

    company: this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      catchPhrase: ['', Validators.maxLength(200)],
      bs: ['', Validators.maxLength(100)],
    }),
  });

  submit(): void {
    if (this.userForm.invalid) {
      return;
    }

    this.createUser.emit({
      ...this.userForm.getRawValue(),
      id: Date.now(),
    });
    this.userForm.reset();
  }

}