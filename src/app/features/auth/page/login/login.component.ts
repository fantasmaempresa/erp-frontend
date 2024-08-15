import { Component, HostBinding, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  loginStart,
  selectErrorMessage,
  selectIsLoading,
} from '../../../../state/auth';
import { AuthService } from 'src/app/core/services/auth.service';

interface LoginForm {
  username: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @HostBinding('class') classes = 'flex-fill justify-content-center row';

  signUpForm = new FormGroup<LoginForm>({
    username: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  hidePassword = true;

  isLoading$!: Observable<boolean>;

  errorMessage$!: Observable<string | null>;

  constructor(private router: Router, private store: Store, private _authService: AuthService) {

    if(_authService.verifyOpenSession()) {
      this.router.navigate(['/','app', 'dashboard']);
    }
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select(selectIsLoading);
    this.errorMessage$ = this.store.select(selectErrorMessage);
  }

  onSubmit() {
    this.signUpForm.markAllAsTouched();
    if (this.signUpForm.invalid) {
      return;
    }
    const { username, password } = this.signUpForm.value;
    if (username && password) {
      this.store.dispatch(loginStart({ username, password }));
    }
  }

}
