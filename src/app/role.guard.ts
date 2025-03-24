import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthState } from '../store/auth.reducer';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private store: Store<{ auth: AuthState }>, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const expectedRole = route.data['role'];
    return this.store.select('auth').pipe(
      take(1),
      map(authState => {
        if (authState.user && authState.user.role === expectedRole) {
          return true;
        }
        this.router.navigate(['/unauthorized']);
        return false;
      })
    );
  }
}
