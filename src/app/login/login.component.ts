// login.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Store } from '@ngrx/store';
import * as AuthActions from '../../store/auth.actions';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private store: Store) {}

  onLogin() {
    this.store.dispatch(AuthActions.login({ email: this.email, password: this.password }));
  }
}
