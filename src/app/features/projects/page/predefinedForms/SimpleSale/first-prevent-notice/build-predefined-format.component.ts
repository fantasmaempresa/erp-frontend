import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { LoaderService, MessageHelper } from 'o2c_core';
import { PredefinedFormLifeCycle } from 'src/app/core/interfaces/PredefinedFormLifeCycle';
import { ExcecutePhasePredefinedService } from 'src/app/data/services/excecute-phase-predefined.service';
import { SharedDataService } from 'src/app/data/services/shared-data.service';
import { CategoryOptions, EditorOptions } from 'src/app/shared/components/text-editor-with-category-autocomplete/text-editor-with-category-autocomplete.component';

@AutoUnsubscribe()
@Component({
  selector: 'app-build-predefined-format',
  templateUrl: './build-predefined-format.html',
  styleUrls: ['./build-predefined-format.scss']
})
export class BuildPredefinedFormatComponent implements OnInit, OnDestroy, PredefinedFormLifeCycle {
  nameProcess: string = '';
  namePhase: string = '';
  generateFormat: string = '';
  categories: CategoryOptions[] = [];
  editorArray: EditorOptions[] = [];
  form: UntypedFormGroup;
  title: string = 'Build Predefined Format';
  previewBuilderForm = true;
  patchValues: any = null;
  loadStructure: boolean = false;
  synchronizer$: any;

  constructor(
    private route: ActivatedRoute,
    private synchronizer: SharedDataService,
    private dispacher: ExcecutePhasePredefinedService,
    private loaderService: LoaderService,
  ) {
    this.form = new UntypedFormGroup({
      format: new FormControl('', []),
    });
  }

  ngOnInit(): void {
    this.synchronizer.updateLastForm(this.form);

    if (this.synchronizer$) this.synchronizer$.unsubscribe();
    this.synchronizer$ = this.synchronizer.executionCommand$.subscribe((commands) => {
      console.log('this.synchronizer.executionCommand$ ---> ', commands);
      this.executeCommands(commands);
    });


  }
  ngOnDestroy(): void {
    if (this.synchronizer$) this.synchronizer$.unsubscribe();
  }

  next(args?: { process_id: number; project_id: number; data: any; }, callback?: Function) {
    console.log('Ejecuto comando ... next');
    this.onSubmit(args, callback);
  }

  prev(args?: { process_id: number; project_id: number; data: any; }, callback?: Function) {

  }

  writeValue(value: any) {
    if (this.loadStructure) {
      this.form.patchValue(value);
      this.form.reset();
    }
    if (typeof value.format != 'undefined')
      this.patchValues = value;
  }

  onSubmit(args?: any, callback?: Function): void {
    this.dispacher.saveFormat(args.project_id, args.process_id,
      {
        data: { content: this.transformData([this.form.controls.format.value]) },
        namePhase: this.namePhase,
        nameProcess: this.nameProcess,
      }).subscribe({
        next: (value: any) => {
          if (typeof callback == 'function') {
            callback(JSON.stringify({ report: value.id }));
          }
        },
        error: (error) => {
          MessageHelper.errorMessage('No se puede almacenar la información por el momento, consulte a su administrador');
        }
      });


  }

  executeCommands(commands: { command: string; args?: any; callback?: Function; }) {
    switch (commands?.command) {
      case 'loadStructureFormat':
        this.loadStructureFormat(commands.args);
        break;
      case 'next':
        this.next(commands.args, commands.callback);
        break;
      case 'prev':
        this.prev();
        break;
      case 'patchForm':
        this.writeValue(commands.args);
        break;
      default:
        console.log('Comando no reconocido');
    }
  }

  loadStructureFormat(args: any) {
    if (args.format[0].namePhase == '' ||
      args.format[0].nameProcess == '' ||
      args.format[0].generateFormat == '')
      return;

    this.generateFormat = args.format[0].generateFormat ?? '';
    this.namePhase = args.format[0].namePhase ?? '';
    this.nameProcess = args.format[0].nameProcess ?? ''

    if (!this.loadStructure) {
      this.loadStructure = true;
      console.log("se pide la estructura del formato --> ", args);
      this.loaderService.showFullScreenLoader();
      this.dispacher.getStructureFormat(
        args.project_id,
        args.process_id,
        {
          namePhase: this.namePhase,
          nameProcess: this.nameProcess,
          data: { test: 'test' }
        })
        .subscribe({
          next: (value: any) => {
            this.editorArray = value.content.map((item: any) => {
              return {
                name: item.name,
                controlName: item.name,
              };
            });

            this.title = value.title;
            this.categories = value.data;

            let patch = value.content.reduce((acc: any, item: any) => {
              //  @ts-ignore
              acc[item.name] = item.text;
              return acc;
            }, {});

            setTimeout(() => {
              if (this.patchValues) {
                this.form.patchValue(this.patchValues);

              } else {
                this.form.patchValue({ format: patch });
              }
            }, 200);

            this.loaderService.hideLoader();
          },
          error: (error: any) => {
            this.loaderService.hideLoader();
            MessageHelper.errorMessage('No se puede generar la estructura en este momento');
            this.loadStructure = false;

          },
        });
    }

  }

  submit() {
    this.form.value;
  }

  generateReport() {
    console.log('generating report');
    if (this.namePhase == '' && this.nameProcess == '') return;
    this.loaderService.showFullScreenLoader();
    this.dispacher.generateFormat({
      namePhase: this.generateFormat,
      nameProcess: this.nameProcess,
      data: { content: this.transformData([this.form.controls.format.value]) },
    }).subscribe({
      next: async (response: any) => {
        const blob = new Blob([response.body], {
          type: response.headers.get('content-type'),
        });
        // @ts-ignore
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = this.title + '.rft';
        // link.download = ;
        link.click();
        URL.revokeObjectURL(link.href);
        await MessageHelper.successMessage(
          'Reporte Generado',
          'El reporte se genero con éxito',
        );
        this.loaderService.hideLoader();
      },
      error: (error: any) => {
        console.error('Error generating report', error);
      },
    });
  }

  transformData(datos: any) {
    return datos.reduce((resultado: any, documento: any, indiceDocumento: any) => {
      const nuevosElementos = Object.entries(documento).map(([clave, valor], indice) => ({
        id: indiceDocumento * Object.keys(documento).length + indice,
        name: clave,
        text: valor
      }));
      return resultado.concat(nuevosElementos);
    }, []);
  }
}