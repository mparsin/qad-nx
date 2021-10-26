import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PersistenceService } from '@qad-nx/shared-utils';

import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private persistenceService: PersistenceService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.persistenceService.getToken();

    req = req.clone({
      setHeaders: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    });

    return next.handle(req).pipe(
      catchError(err => {
        console.log('interceptor handle error', err);
        if (err.status === 401) {
          // this.authService.logoutUser(req.params);
        }
        // const error = err.error.message || err.statusText;
        return throwError(err);
      })
    );
  }
}
