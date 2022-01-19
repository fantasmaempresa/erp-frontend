import { Component, HostBinding, OnInit } from '@angular/core';
import { FormValidationService } from '../../../../shared/services/form-validation.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { validationMessages } from '../../../../core/constants/validationMessages';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { loginStart } from '../../../../state/auth/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @HostBinding('class') classes = 'flex-fill justify-content-center row';

  constructor(
    private formValidationService: FormValidationService,
    private router: Router,
    private store: Store,
  ) {}

  signUpForm!: FormGroup;

  hidePassword = true;

  isLoading = false;

  formErrors: any = {};

  ngOnInit(): void {
    this.signUpForm = new FormGroup(
      {
        username: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', Validators.required),
        confirmPassword: new FormControl('', Validators.required),
      },
      {
        validators: this.formValidationService.matchConfirmItems('password', 'confirmPassword'),
      },
    );

    this.signUpForm.valueChanges.subscribe(() => {
      this.logValidationErrors();
    });
  }

  logValidationErrors() {
    this.formErrors = this.formValidationService.getValidationErrors(
      this.signUpForm,
      validationMessages,
    );
  }

  onSubmit() {
    this.signUpForm.markAllAsTouched();
    this.logValidationErrors();
    this.isLoading = true;
    const username = this.signUpForm.value.username;
    const password = this.signUpForm.value.password;
    this.store.dispatch(loginStart({ username, password }));
    // setTimeout(async () => {
    //   this.isLoading = false;
    //   await this.router.navigate(['/dashboard']);
    // }, 3000);
  }
}
