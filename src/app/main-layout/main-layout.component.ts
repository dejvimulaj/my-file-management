import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import * as AuthActions from '../../store/auth.actions';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: `./main-layout.component.html`,
})
export class MainLayoutComponent {
  constructor(private store: Store) {}
  onLogout() {
    this.store.dispatch(AuthActions.logout());
  }

 showNewModal = false;


 onNewClick() {
   this.showNewModal = true;
 }


 closeModal() {
   this.showNewModal = false;
 }

 createFolder() {
   console.log('Creating a new folder...');
   this.closeModal();
 }

 createFile() {
   console.log('Creating a new file...');
   this.closeModal();
 }

}
