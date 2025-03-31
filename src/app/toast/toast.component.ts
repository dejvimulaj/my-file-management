// toast.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService, Toast } from '../../services/toast.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="toast$ | async as toast"
         [ngClass]="{
           'bg-green-500': toast.type === 'success',
           'bg-red-500': toast.type === 'error'
         }"
         class="fixed top-4 right-4 max-w-xs w-full text-white shadow-lg rounded-lg p-4 flex items-center animate-pulse space-x-3 hover:scale-105">
      <!-- Icon (optional, you can choose a different icon for error) -->
      <svg *ngIf="toast.type==='success'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8.5 8.5a1 1 0 01-1.414 0l-4.5-4.5a1 1 0 011.414-1.414L8 12.086l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
      </svg>
      <svg *ngIf="toast.type==='error'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.681-1.36 3.446 0l6.518 11.59c.75 1.334-.213 2.98-1.723 2.98H3.462c-1.51 0-2.473-1.646-1.723-2.98l6.518-11.59zM11 13a1 1 0 10-2 0 1 1 0 002 0zm-1-2a1 1 0 01-1-1V7a1 1 0 112 0v3a1 1 0 01-1 1z" clip-rule="evenodd" />
      </svg>

      <!-- Toast Message -->
      <div class="flex-1">
          <p class="font-bold">{{ toast.title }}</p>
          <p class="text-sm">{{ toast.message }}</p>
      </div>
      <!-- Close Button -->
      <button (click)="close()" class="text-white hover:text-gray-300 focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
      </button>
    </div>
  `
})
export class ToastComponent {
  toast$: Observable<Toast | null>;

  constructor(private toastService: ToastService) {
    this.toast$ = this.toastService.toast$;
  }

  close() {
    this.toastService.hideToast();
  }
}
