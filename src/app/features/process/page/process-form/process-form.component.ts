import { Component, Injector } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {
  CLAZZ,
  LOAD_ACTION,
  LOAD_NEXT_ACTION,
  SELECTOR,
} from '../../../../shared/components/dinamyc-views/dynamic-views.module';
import { Class2ViewBuilderService } from '../../../../shared/components/dinamyc-views/services/class2-view-builder.service';
import { PopupSelectorComponent } from '../../../../shared/components/dinamyc-views/popup-selector/popup-selector.component';
import { Client } from '../../../../data/models/Client.model';
import { loadClients, loadNextPageOfClients } from '../../../../state/clients/clients.actions';
import { selectClients } from '../../../../state/clients/clients.selector';

@Component({
  selector: 'app-process-form',
  templateUrl: './process-form.component.html',
  styleUrls: ['./process-form.component.scss'],
})
export class ProcessFormComponent {
  edit = false;

  step = 0;

  form!: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private inj: Injector,
  ) {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      config: new FormControl(null),
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

  openDialog() {
    const inj = Injector.create({
      providers: [
        { provide: CLAZZ, useValue: Client },
        { provide: LOAD_ACTION, useValue: loadClients() },
        { provide: LOAD_NEXT_ACTION, useValue: loadNextPageOfClients },
        { provide: SELECTOR, useValue: selectClients },
        { provide: Class2ViewBuilderService },
      ],
      parent: this.inj,
    });

    const dialogRef = this.dialog.open(PopupSelectorComponent, {
      data: {
        title: 'Fases de Proceso',
        property: 'name',
        inj,
      },
    });
  }
}
