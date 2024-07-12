import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { OfficeSecurityMeasuresService } from 'src/app/data/services/office-security-measures.service';
import { Observable } from 'rxjs';
import { MessageHelper } from 'o2c_core';
import { OfficeSecurityMeasuresDto } from 'src/app/data/dto/OfficeSecurityMeasures.dto';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { ArticleView } from 'src/app/data/presentation/Article.view';
import { StaffView } from 'src/app/data/presentation/staff.view';

@AutoUnsubscribe()
@Component({
  selector: 'app-office-security-measures-form',
  templateUrl: './office-security-measures-form.component.html',
  styleUrls: ['./office-security-measures-form.component.scss']
})
export class OfficeSecurityMeasuresFormComponent {
  officeSecurityMeasuresForm = new UntypedFormGroup({
    id: new UntypedFormControl('',[
      Validators.required,
      Validators.maxLength(20),
    ]),
    staff_id: new UntypedFormControl('',[
        Validators.required,
        Validators.maxLength(20),
    ]),
    article_id: new UntypedFormControl('',[
      Validators.required,
      Validators.maxLength(20),
    ]),
    //Dates
    adquisition_date: new UntypedFormControl('',[
      Validators.required]
    ),
    return_date: new UntypedFormControl('',[
      Validators.required]
    ),
    adquisition_comments: new UntypedFormControl('',[
      Validators.required,
      Validators.maxLength(100),
    ]),
    return_comments: new UntypedFormControl('',[
      Validators.required,
      Validators.maxLength(100),
    ]),
  });
  
  isEdit: boolean = false;

  isDialog: boolean = false;

  articleProvider = ArticleView;

  staffProvider = StaffView;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private officeSecurityMeasuresService: OfficeSecurityMeasuresService,
  ){
    const currentRoute = this.route.snapshot.routeConfig?.path;
    if (typeof currentRoute == 'undefined') {
      this.isDialog = true;
    }

    const id = Number(this.route.snapshot.params.id);
    if (!isNaN(id)) {
      this.isEdit=true;
      officeSecurityMeasuresService.fetch(id).subscribe({
        next: (officeSecurityMeasures) => {
          this.officeSecurityMeasuresForm.addControl('id', new UntypedFormControl(''));
          this.officeSecurityMeasuresForm.patchValue(officeSecurityMeasures);
        }
      });
    }    
  }

  ngOnDestroy(): void {
  }

  async backToListOfficeSecurityMeasures(){
    if (this.isDialog) {
      return;
    } else {
      await this.router.navigate(['../'], {relativeTo: this.route});
    }
  }

  onSubmit() {
    let request$:  Observable<OfficeSecurityMeasuresDto>;
    if (!this.isEdit) {
      request$ = this.officeSecurityMeasuresService.save(this.officeSecurityMeasuresForm.value);
    } else {
      request$ = this.officeSecurityMeasuresService.update(this.officeSecurityMeasuresForm.value);
    }
    request$.subscribe({
      next: async () => {
        const message  = this.isEdit ? 'actualizado' : 'registrado';
        await MessageHelper.successMessage(
          '¡Éxito!',
          `El Artículo ha sido ${message} correctamente`,
        );
        await this.backToListOfficeSecurityMeasures();
      },
      error: async (error) => {
        console.log(error);
        if (error.error.code !=  null && error.error.code == 422) {
          if (typeof(error.error.error) === 'object') {
            let message = '';

            for (let item in error.error.error){
              message = message + '\n' + error.error.error[item];
            }
            await MessageHelper.errorMessage(message);
          } else {
            await MessageHelper.errorMessage(error.error.error);
          }
        } else if (error.error.code != null && error.error.code ==  409) {
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
