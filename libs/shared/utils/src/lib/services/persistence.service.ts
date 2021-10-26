import { Injectable } from '@angular/core';
import { CurrentUserInterface } from '@qad-nx/eqms-auth-data-access';

@Injectable({ providedIn: 'root' })
export class PersistenceService {
  private AUTH_DATA = 'auth_data';

  set(key: string, data: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.log('Error saving to local storage', e);
    }
  }

  get(key: string): any {
    try {
      const auth_data = localStorage.getItem(key);
      return auth_data ? JSON.parse(auth_data) : null;
    } catch (e) {
      console.error('Error getting data from local storage');
    }
  }

  getToken(): string {
    const authData = this.get(this.AUTH_DATA);
    return authData ? authData.access_token : null;
  }

  removeToken() {
    try {
      localStorage.removeItem(this.AUTH_DATA);
    } catch (e) {
      console.error('Error removing token from the local storage');
    }
  }

  setUser(user: CurrentUserInterface) {
    console.log('setting user');
    this.set(this.AUTH_DATA, user);
  }

  getUser(): CurrentUserInterface {
    return this.get(this.AUTH_DATA);
  }
}
