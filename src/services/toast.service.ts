import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Toast {
  title: string;
  message: string;
  type: 'success' | 'error';
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastSubject = new BehaviorSubject<Toast | null>(null);
  toast$ = this.toastSubject.asObservable();

  showToast(toast: Toast, duration: number = 2000) {
    this.toastSubject.next(toast);
    setTimeout(() => {
      this.hideToast();
    }, duration);
  }

  hideToast() {
    this.toastSubject.next(null);
  }
}