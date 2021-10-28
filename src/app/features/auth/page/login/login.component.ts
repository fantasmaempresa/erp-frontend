import { Component, HostBinding, OnInit } from '@angular/core';
import { FormValidationService } from '../../../../shared/services/form-validation.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { validationMessages } from '../../../../core/constants/validationMessages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @HostBinding('class') classes = 'flex-fill justify-content-center row';

  constructor(private formValidationService: FormValidationService) {}

  signUpForm!: FormGroup;

  isLoading = false;

  formErrors: any = {};

  ngOnInit(): void {
    this.signUpForm = new FormGroup(
      {
        email: new FormControl('', [Validators.required, Validators.email]),
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
    setTimeout(() => {
      this.isLoading = false;
    }, 3000);
    console.log(this.signUpForm.value);
  }
}
