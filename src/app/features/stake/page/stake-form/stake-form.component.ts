import { Component } from "@angular/core";
import { UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import { StakeService } from "../../../../data/services/stake.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { MessageHelper } from "o2c_core";
import { StakeDto } from "../../../../data/dto/Stake.dto";

@Component({
  selector: 'app-stake-form',
  templateUrl: './stake-form.component.html',
  styleUrls: ['./stake-form.component.scss']
})
export class StakeFormComponent {
  stakeForm = new UntypedFormGroup({
    name: new UntypedFormControl('', [Validators.required]),
  });

  isEdit: boolean = false;

  isDialog: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private stakeService: StakeService
  ) {
    const currentRoute = this.route.snapshot.routeConfig?.path;

    if (typeof currentRoute === 'undefined') {
      this.isDialog = true;
    }

    const id = Number(this.route.snapshot.params.id);
    if (!isNaN(id)) {
      this.isEdit = true;
      stakeService.fetch(id).subscribe({
        next: (stake) => {
          this.stakeForm.addControl('id', new UntypedFormControl(''));
          this.stakeForm.patchValue(stake);
        },
      });
    }
  }

  async backToListStake() {
    if (this.isDialog) {
      return;
    } else {
      await this.router.navigate(['../'], { relativeTo: this.route });
    }
  }

  onSubmit() {

    let request$: Observable<StakeDto>;

    if (!this.isEdit) {
      request$ = this.stakeService.save(this.stakeForm.value);
    } else {
      request$ = this.stakeService.update(this.stakeForm.value);
    }
    request$.subscribe({
      next: async () => {
        const message = this.isEdit ? 'actualizada' : 'registrada';
        await MessageHelper.successMessage(
          '¡Éxito!',
          `La operación ha sido ${message} correctamente.`,
        );
        await this.backToListStake();
      },
    });
  }

}
