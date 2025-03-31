import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastComponent } from "./toast/toast.component";
import * as AuthActions from '../store/auth.actions';
import { Store } from '@ngrx/store';
import { NavbarComponent } from "./navbar/navbar.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  constructor(private store: Store) {}
  title = 'my-file-management';
  
  ngOnInit() {
    const authData = localStorage.getItem('auth');
    if (authData) {
      const parsedAuth = JSON.parse(authData);
      // Dispatch loginSuccess action to rehydrate auth state
      this.store.dispatch(AuthActions.loginSuccess({ token: parsedAuth.token, user: parsedAuth.user }));
    }
  }
}
