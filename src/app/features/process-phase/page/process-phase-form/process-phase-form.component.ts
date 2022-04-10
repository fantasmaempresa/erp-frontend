import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProcessPhaseService } from '../../../../data/services/process-phase.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-process-phase-form',
  templateUrl: './process-phase-form.component.html',
  styleUrls: ['./process-phase-form.component.scss'],
})
export class ProcessPhaseFormComponent {
  step = 0;

  form!: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private processPhaseService: ProcessPhaseService,
  ) {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      reportable: new FormControl(false),
      payments: new FormControl(false),
      admin: new FormControl(false),
      roles: new FormControl(null, [Validators.required]),
    });
  }

  async back() {
    await this.router.navigate(['../'], { relativeTo: this.route });
  }

  setStep(step: number) {
    this.step = step;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  onSubmit() {}
}
