import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthStore } from '@qad-nx/web/auth/data-access';

@Component({
  selector: 'as-artist',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AuthStore]
})
export class LoginComponent implements OnInit {
  isLoggingIn$ = this.authStore.isLoggingIn$;
  isError$ = this.authStore.isError$;
  password = '';
  username = '';

  constructor(private authStore: AuthStore) {}

  ngOnInit(): void {

  }

  login() {
    this.authStore.loginEffect({username: this.username, password: this.password});
  }
}
