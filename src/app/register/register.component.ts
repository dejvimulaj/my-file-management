import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../store/auth.actions';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: `../register/register.component.html`,
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  role: string = 'user'; 

  constructor(private store: Store) {}

  onRegister() {
    this.store.dispatch(AuthActions.registerUser({
      email: this.email,
      password: this.password,
      role: this.role
    }));
  }
}

// <h2>Register</h2>
//     <form (ngSubmit)="onRegister()">
//       <div>
//         <label for="email">Email:</label>
//         <input 
//           type="email" 
//           id="email" 
//           name="email" 
//           [(ngModel)]="email" 
//           placeholder="Enter your email" 
//           required>
//       </div>
//       <div>
//         <label for="password">Password:</label>
//         <input 
//           type="password" 
//           id="password" 
//           name="password" 
//           [(ngModel)]="password" 
//           placeholder="Enter your password" 
//           required>
//       </div>
//       <div>
//         <label for="role">Role:</label>
//         <select id="role" name="role" [(ngModel)]="role">
//           <option value="user">User</option>
//           <option value="admin">Admin</option>
//         </select>
//       </div>
//       <button type="submit">Register</button>
//     </form>