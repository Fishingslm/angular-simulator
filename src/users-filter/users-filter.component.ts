import { Component, DestroyRef, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, tap } from 'rxjs';

@Component({
  selector: 'app-users-filter',
  imports: [ReactiveFormsModule],
  templateUrl: './users-filter.component.html',
  styleUrl: './users-filter.component.scss',
})
export class UsersFilterComponent implements OnInit {

  @Output() searchChange: EventEmitter<string> = new EventEmitter<string>();

  private destroyRef: DestroyRef = inject(DestroyRef);

  searchControl: FormControl<string> = new FormControl<string>('', {
    nonNullable: true,
  });

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(
        map((value: string): string => value.trim().toLowerCase()),
        debounceTime(200),
        distinctUntilChanged(),
        tap((query: string): void => {
          this.searchChange.emit(query);
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }

}