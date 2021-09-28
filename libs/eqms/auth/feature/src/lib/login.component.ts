import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import icVisibility from '@iconify/icons-ic/twotone-visibility';
import icVisibilityOff from '@iconify/icons-ic/twotone-visibility-off';
import { AuthStore, LoginInfoStore } from '@qad-nx/eqms-auth-data-access';
import { fadeInRight400ms, fadeInUp400ms, scaleFadeIn400ms } from '@qad-nx/shared-animations';
import { Icon } from '@visurel/iconify-angular';

@Component({
  selector: 'qad-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInUp400ms, fadeInRight400ms, scaleFadeIn400ms],
  providers: [AuthStore, LoginInfoStore],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  isLoggingIn$ = this.authStore.isLoggingIn$;
  isError$ = this.authStore.isError$;
  password = '';
  username = '';
  inputType = 'password';
  visible = false;
  icVisibility: Icon = icVisibility;
  icVisibilityOff: Icon = icVisibilityOff;
  loginInfo$ = this.loginInfoStore.loginInfo$;
  loginInfoLoading = this.loginInfoStore.isLoading$;
  loginInfoError = this.loginInfoStore.isError$

  constructor(
    private authStore: AuthStore,
    private loginInfoStore: LoginInfoStore,
    private cd: ChangeDetectorRef,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      selectedEnvironment: ['', Validators.required],
    });
  }

  send() {
    this.authStore.loginEffect({
      username: this.username,
      password: this.password,
    });
  }

  toggleVisibility() {
    if (this.visible) {
      this.inputType = 'password';
      this.visible = false;
      this.cd.markForCheck();
    } else {
      this.inputType = 'text';
      this.visible = true;
      this.cd.markForCheck();
    }
  }
}
