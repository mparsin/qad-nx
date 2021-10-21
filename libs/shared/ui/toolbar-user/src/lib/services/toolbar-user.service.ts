import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ToolbarUserService {
  private userSubject: BehaviorSubject<string> = new BehaviorSubject<string>(
    'Unknown'
  );

  public user$ = this.userSubject.asObservable();

  public setUser(user: string) {
    this.userSubject.next(user);
  }
}
