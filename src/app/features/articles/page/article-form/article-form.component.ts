import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { 
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ArticleService } from 'src/app/data/services/article.service';
import { Observable } from 'rxjs';
import { MessageHelper } from 'o2c_core';
import { ArticleDto } from 'src/app/data/dto/Article.dto';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { LineView } from 'src/app/data/presentation/Line.view';

@AutoUnsubscribe()
@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss']
})
export class ArticleFormComponent implements OnDestroy{
  articleForm = new UntypedFormGroup({
    billable: new UntypedFormControl('',[Validators.required]),
    bar_code: new UntypedFormControl('',[
      Validators.required,
      Validators.maxLength(15),
    ]),
    description: new UntypedFormControl('',[
      Validators.required,
      Validators.maxLength(100),
    ]),
    name: new UntypedFormControl('',[
      Validators.required,
      Validators.maxLength(100),
    ]),
    image: new UntypedFormControl('',[
      Validators.maxLength(200),
    ]),
    line_id: new UntypedFormControl('',[
      Validators.required,
      Validators.maxLength(20),
    ]),
    purchase_cost: new UntypedFormControl('',[
      Validators.required,
      Validators.maxLength(10),
    ]),
    sale_cost: new UntypedFormControl('',[
      Validators.required,
      Validators.maxLength(10),
    ]),
    type: new UntypedFormControl('',[
      Validators.required,
    ]),
    brand: new UntypedFormControl('',[
      Validators.required,
      Validators.maxLength(50),
    ]),
    storable: new UntypedFormControl('',[
      Validators.required,
    ]),
    purchase_measure_unit: new UntypedFormControl('',[
      Validators.required,
      Validators.maxLength(10),
    ]),
    sale_measure_unit: new UntypedFormControl('',[
      Validators.required,
      Validators.maxLength(10),
    ]),
  });

  isEdit: boolean = false;

  isDialog: boolean = false;

  lineProvider = LineView;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private articleService: ArticleService,
  ){
    const currentRoute = this.route.snapshot.routeConfig?.path;
    if (typeof currentRoute == 'undefined') {
      this.isDialog = true;
    }

    const id = Number(this.route.snapshot.params.id);
    if (!isNaN(id)) {
      this.isEdit=true;
      articleService.fetch(id).subscribe({
        next: (article) => {
          this.articleForm.addControl('id', new UntypedFormControl(''));
          this.articleForm.patchValue(article);
        }
      });
    }    
  }

  ngOnDestroy(): void {
  }

  async backToListArticle(){
    if (this.isDialog) {
      return;
    } else {
      await this.router.navigate(['../'], {relativeTo: this.route});
    }
  }

  onSubmit() {
    let request$:  Observable<ArticleDto>;
    if (!this.isEdit) {
      request$ = this.articleService.save(this.articleForm.value);
    } else {
      request$ = this.articleService.update(this.articleForm.value);
    }
    request$.subscribe({
      next: async () => {
        const message  = this.isEdit ? 'actualizado' : 'registrado';
        await MessageHelper.successMessage(
          '¡Éxito!',
          `El Artículo ha sido ${message} correctamente`,
        );
        await this.backToListArticle();
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
