// // login.component.ts
// import { Component } from '@angular/core';
// import { FormsModule } from '@angular/forms';

// import { Store } from '@ngrx/store';
// import * as AuthActions from '../../store/auth.actions';

// @Component({
//   selector: 'app-login',
//   imports: [FormsModule],
//   template: `
//     <h2>Login</h2>
//     <input [(ngModel)]="email" placeholder="Email" />
//     <input [(ngModel)]="password" type="password" placeholder="Password" />
//     <button (click)="onLogin()">Login</button>
//   `
// })
// export class LoginComponent {
//   email = '';
//   password = '';

//   constructor(private store: Store) {}

//   onLogin() {
//     this.store.dispatch(AuthActions.login({ email: this.email, password: this.password }));
//   }
// }
