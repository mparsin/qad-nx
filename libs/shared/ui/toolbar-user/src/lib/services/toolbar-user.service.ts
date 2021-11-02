import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, Subject } from 'rxjs';

@Injectable()
export class ToolbarUserService {
  private userSubject: BehaviorSubject<string> = new BehaviorSubject<string>(
    'Unknown'
  );
  private logoutSubject = new Subject();

  public user$ = this.userSubject.asObservable();
  public logout$ = this.logoutSubject.asObservable();

  public setUser(user: string) {
    this.userSubject.next(user);
  }

  public logout() {
    this.logoutSubject.next(EMPTY);
  }
}
