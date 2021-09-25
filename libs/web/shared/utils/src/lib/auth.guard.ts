import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
} from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { isLoggedInSelector } from '@qad-nx/web/auth/data-access';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private store: Store) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> {
        return this.store.pipe(
            select(isLoggedInSelector),
            tap((loggedIn) => {
                if (!loggedIn) {
                    this.router.navigate(['auth'], {
                        queryParams: {
                            redirectUrl: state.url,
                        },
                    });
                }
            })
        );
    }
}
