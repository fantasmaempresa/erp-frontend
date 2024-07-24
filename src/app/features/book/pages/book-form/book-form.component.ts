import { Component, OnDestroy } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { MessageHelper } from 'o2c_core';
import { Observable } from 'rxjs';
import { BookDto } from 'src/app/data/dto/Book.dto';
import { BookServiceService } from 'src/app/data/services/book-service.service';
@AutoUnsubscribe()
@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnDestroy {
  isEdit: boolean = false;

  isDialog: boolean = false;

  form: UntypedFormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _bookService: BookServiceService,
  ) {

    this.form =  new UntypedFormGroup({
      name: new UntypedFormControl(null, [
        Validators.required,
      ]),
      folio_min: new UntypedFormControl(null, [
        Validators.required,
      ]),
      folio_max: new UntypedFormControl(null, [
        Validators.required,
      ]),
      date_proceeding: new UntypedFormControl(null, [
        Validators.required,
      ]),
    });

    const currentRoute = this.route.snapshot.routeConfig?.path;
    if (typeof currentRoute === 'undefined') {
      this.isDialog = true;
    }

    const id = Number(this.route.snapshot.params.id);
    if (!isNaN(id)) {
      this.isEdit = true;
      _bookService.fetch(id).subscribe({
        next: (book) => {
          this.form.addControl('id', new UntypedFormControl(''));
          this.form.patchValue(book);
        },
      });
    }
  }

  ngOnDestroy() {}

  async backToList() {
    if (this.isDialog) {
      return;
    }
    await this.router.navigate(['../'], { relativeTo: this.route });
  }

  submit(){
    if (this.form.invalid) return;
    
    let request$: Observable<BookDto>;
    if (!this.isEdit) {
      request$ = this._bookService.save(this.form.value);
    } else {
      request$ = this._bookService.update(this.form.value);
    }
    request$.subscribe({
      next: async () => {
        const message = this.isEdit ? 'actualizado' : 'registrado';
        await MessageHelper.successMessage(
          '¡Éxito!',
          `El libro ha sido ${message} correctamente.`,
        );
        await this.backToList();
      },
      error: async (error) => {
        console.log(error);
        if (error.error.code != null && error.error.code == 422) {
          if (typeof error.error.error === 'object') {
            let message = '';

            for (let item in error.error.error) {
              message = message + '\n' + error.error.error[item];
            }

            await MessageHelper.errorMessage(message);
          } else {
            await MessageHelper.errorMessage(error.error.error);
          }
        } else if (error.error.code != null && error.error.code == 409) {
          await MessageHelper.errorMessage(
            'Error referente a la base de datos, consulte a su administrador',
          );
        } else if (error.error.code != null && error.error.code == 500) {
          await MessageHelper.errorMessage(
            'Existe un error dentro del servidor, consulte con el administrador',
          );
        } else {
          await MessageHelper.errorMessage(
            'Hubo un error, intente más tarde por favor',
          );
        }
      },
    });
  }
}
