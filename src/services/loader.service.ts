import { DOCUMENT, Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {

  private document: Document = inject(DOCUMENT);

  private loadingSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  loading$: Observable<boolean> = this.loadingSubject.asObservable();

  showLoader(): void {
    this.document.body.classList.add('no-scroll');
    this.loadingSubject.next(true);
  }

  hideLoader(): void {
    this.document.body.classList.remove('no-scroll');
    this.loadingSubject.next(false);
  }
}