import { Component, HostBinding, OnInit } from "@angular/core";
import { FormValidationService } from "../../../../shared/services/form-validation.service";
import { UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import { validationMessages } from "../../../../core/constants/validationMessages";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { loginStart } from "../../../../state/auth/auth.actions";
import { Observable } from "rxjs";
import { selectErrorMessage, selectIsLoading } from "../../../../state/auth/auth.selector";
import { ThemeManagerService } from "../../../../core/services/theme-manager.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  @HostBinding("class") classes = "flex-fill justify-content-center row";

  constructor(
    private formValidationService: FormValidationService,
    private router: Router,
    private store: Store,
    private themeManager: ThemeManagerService,
  ) {}

  signUpForm!: UntypedFormGroup;

  hidePassword = true;

  isLoading$!: Observable<boolean>;

  formErrors: any = {};

  errorMessage$!: Observable<string | null>;

  ngOnInit(): void {
    this.isLoading$ = this.store.select(selectIsLoading);
    this.errorMessage$ = this.store.select(selectErrorMessage);
    this.signUpForm = new UntypedFormGroup(
      {
        username: new UntypedFormControl("", [Validators.required, Validators.email]),
        password: new UntypedFormControl("", Validators.required),
        confirmPassword: new UntypedFormControl("", Validators.required)
      },
      {
        validators: this.formValidationService.matchConfirmItems("password", "confirmPassword")
      }
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
    const username = this.signUpForm.value.username;
    const password = this.signUpForm.value.password;
    this.store.dispatch(loginStart({ username, password }));
  }
}
