import { Component, OnDestroy } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { ProcedureView } from 'src/app/data/presentation/Procedure.view';
import { ProcedureService } from 'src/app/data/services/procedure.service';

@AutoUnsubscribe()
@Component({
  selector: 'app-vulnerable-operations-form',
  templateUrl: './vulnerable-operations-form.component.html',
  styleUrls: ['./vulnerable-operations-form.component.scss']
})
export class VulnerableOperationsFormComponent implements OnDestroy {
  step = 0;
  isEdit: boolean = false;
  procedureProvider = ProcedureView;

  form = new UntypedFormGroup({
    procedure_id: new UntypedFormControl(null, [Validators.required]),
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _procedureService: ProcedureService
  ) {
    this.form.controls.procedure_id.valueChanges.subscribe((value) => {
      this._procedureService.fetch(value).subscribe({
        next: (procedure) => {
          console.log("value ---> ", procedure);
        }
      })
    })
   }

  async backToList() {
    await this.router.navigate(['../'], { relativeTo: this.route });
  }

  goToNext() {
    console.log('next ---> ', this.step);
    // @ts-ignore
    event.preventDefault();
    if (this.step == 1) {
      return;
    }

    this.step++;
  }

  goToPrev() {
    console.log('prev ---> ', this.step);
    // @ts-ignore
    event.preventDefault();
    if (this.step == 0) return;

    this.step--;
    setTimeout(() => {
      console.log('sleeping...');
    });
  }

  onSubmit(){

  }

  ngOnDestroy(): void {}

}
