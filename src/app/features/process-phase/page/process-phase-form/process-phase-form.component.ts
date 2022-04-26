import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProcessPhaseService } from '../../../../data/services/process-phase.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RoleService } from '../../../../data/services/role.service';
import { map, Observable, pluck, startWith } from 'rxjs';
import { Role } from '../../../../data/models/Role.model';
import { MessageHelper } from '../../../../shared/helpers/MessageHelper';

@Component({
  selector: 'app-process-phase-form',
  templateUrl: './process-phase-form.component.html',
  styleUrls: ['./process-phase-form.component.scss'],
})
export class ProcessPhaseFormComponent {
  step = 2;

  form!: FormGroup;

  roles$: Observable<Role[]>;

  mapRoles = (role: Role) => role.name;

  form$!: Observable<any> | undefined;

  edit = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private detectorRef: ChangeDetectorRef,
    private processPhaseService: ProcessPhaseService,
    private roleService: RoleService,
  ) {
    this.roles$ = this.roleService.fetchAll().pipe(pluck('data'));

    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      reportable: new FormControl(false),
      payments: new FormControl(false),
      admin: new FormControl(false),
      roles: new FormControl(null, [Validators.required]),
      form: new FormControl(
        [
          {
            id: '05013ee2-9db3-4c9b-82f6-b19ddef023a7',
            controlType: 'textbox',
            key: 'de texto',
            label: 'De texto',
            required: false,
            options: [],
            value: '',
            order: 0,
          },
          {
            id: 'bfe8f4fa-19e8-42e5-b777-3acdd62b5bd9',
            controlType: 'number',
            key: 'de tipo numerico',
            label: 'De tipo numerico',
            required: null,
            options: [],
            value: null,
            order: null,
          },
          {
            id: '8081086e-271d-4542-8f9d-af93cdd1ee37',
            controlType: 'textarea',
            key: 'area de texto',
            label: 'Area de Texto',
            required: null,
            options: [],
            value: null,
            order: null,
          },
          {
            id: '0537ddf3-27ae-4dce-87df-d2b623432069',
            controlType: 'dropdown',
            key: 'de selección',
            label: 'De selección',
            required: null,
            options: [
              { key: 'test1', value: '2' },
              {
                key: 'super super super super',
                value: '3',
              },
              { key: 'super super', value: '6' },
              { key: 'Ya con esto no falla', value: '1' },
            ],
            value: null,
            order: null,
          },
          {
            id: 'ce902091-8a9a-4a3f-8752-a3c473534f51',
            controlType: 'date',
            key: 'fecha',
            label: 'Fecha',
            required: null,
            options: [],
            value: null,
            order: null,
          },
          {
            id: '2ceabd00-1c00-477b-954e-b008e10e0d1e',
            controlType: 'radio',
            key: 'de tipo radio',
            label: 'De tipo Radio',
            required: null,
            options: [
              { key: 'prueba 1', value: '1' },
              {
                key: 'prueba 2',
                value: '2',
              },
              { key: 'prueba 3 si que si', value: '3' },
              {
                key: 'probando la loongitud de esta madre',
                value: '4',
              },
              { key: 'probando hasta que punto se puede romper el radio', value: '5' },
            ],
            value: null,
            order: null,
          },
          {
            id: 'd3277991-2c65-49a8-91e4-695b1cd5d590',
            controlType: 'checkbox',
            key: 'de tipo checkbox',
            label: 'De tipo Checkbox',
            required: null,
            options: [
              { key: 'Probando que sea de tipo checkbox', value: '1' },
              {
                key: 'probando 2',
                value: '2',
              },
            ],
            value: null,
            order: null,
          },
          {
            id: 'a4b9c634-6864-482c-a76c-69f9c23a95d2',
            controlType: 'file',
            key: 'de tipo archivo',
            label: 'De Tipo Archivo',
            required: false,
            options: [],
            value: '',
            order: 0,
          },
          {
            id: '4f565ece-a836-4a32-a510-20f26bca014b',
            controlType: 'image',
            key: 'de tipo imagen',
            label: 'De tipo Imagen',
            required: null,
            options: [],
            value: null,
            order: null,
          },
          {
            id: '2be5d246-aa81-4b0f-b709-8de9afcb08ba',
            controlType: 'coordinate',
            key: 'de tipo coordenada',
            label: 'De tipo Coordenada',
            required: null,
            options: [],
            value: null,
            order: null,
          },
        ],
        Validators.required,
      ),
    });

    this.form$ = this.form.get('form')?.valueChanges.pipe(
      startWith(this.form.get('form')?.value),
      map((array: any[]) => [...array]),
    );
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

  onSubmit() {
    this.form.markAllAsTouched();
    console.log(this.form.value);
    if (this.form.invalid) {
      MessageHelper.infoMessage('Revisa los campos que te faltan');
      return;
    }
    this.form.value.payments = [];
    const message = this.edit ? 'actualizado' : 'registrado';
    if (!this.edit) {
      this.processPhaseService.save(this.form.value).subscribe({
        next: async () => {
          MessageHelper.successMessage('¡Éxito!', `La fase ha sido ${message} correctamente.`);
          await this.back();
        },
      });
    }
  }
}
