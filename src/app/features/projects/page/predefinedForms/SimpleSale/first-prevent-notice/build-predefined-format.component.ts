import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, UntypedFormGroup } from '@angular/forms';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { LoaderService, MessageHelper, PopupService } from 'o2c_core';
import { concatMap, Observable } from 'rxjs';
import { PredefinedFormLifeCycle } from 'src/app/core/interfaces/PredefinedFormLifeCycle';
import { ReportConfigurationDto } from 'src/app/data/dto/ReportConfiguration.dto';
import { ReportConfigurationView } from 'src/app/data/presentation/ReportConfiguration.view';
import { ExcecutePhasePredefinedService } from 'src/app/data/services/excecute-phase-predefined.service';
import { ReportConfigurationService } from 'src/app/data/services/report-configuration.service';
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
  project_id: number = 0;
  process_id: number = 0;
  generateFormat: string = '';
  categories: CategoryOptions[] = [];
  editorArray: EditorOptions[] = [];
  form: UntypedFormGroup;
  title: string = 'Build Predefined Format';
  previewBuilderForm = true;
  patchValues: any = null;
  loadStructure: boolean = false;
  synchronizer$: any;
  lastReport: ReportConfigurationDto | null = null;
  updateReport: ReportConfigurationDto | null = null;
  showNotification: boolean = false;
  textNotification: string = '';
  $notification: Observable<any> | null = null;
  $popUp: Observable<any> | null = null;

  constructor(
    private synchronizer: SharedDataService,
    private dispacher: ExcecutePhasePredefinedService,
    private loaderService: LoaderService,
    public popupService: PopupService,
    public reportConfigurationService: ReportConfigurationService,
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
    this.onSubmit(args, callback, false);
  }

  prev(
    args?: {
      process_id: number;
      project_id: number;
      data: any;
    }, callback?: Function) {
  }

  writeValue(value: any) {
    if (this.loadStructure) {
      this.form.patchValue(value);
      this.form.reset();
    }
    if (typeof value.format != 'undefined')
      this.patchValues = value;
  }

  onSubmit(args?: any, callback?: Function, decisionMessage: boolean = true): void {

    if (!this.loadStructure) {
      MessageHelper.errorMessage('Primero tiene que cargarse el reporte');
      return;
    }

    let data: any = this.updateReport ?
      { content: this.transformData([this.form.controls.format.value]), reportConfiguration_id: this.updateReport.id } :
      { content: this.transformData([this.form.controls.format.value]) };

    data = this.lastReport ? { ...data, lasted_related_report_id: this.lastReport.id } : data;


    let submit = () => {
      this.dispacher.saveFormat(this.project_id, this.process_id,
        {
          data: data,
          namePhase: this.namePhase,
          nameProcess: this.nameProcess,
        }).pipe(
          concatMap((value: any) => {
            this.updateReport = value;
            return this.dispacher.issueEvent(
              this.project_id,
              this.process_id,
              {
                nameProcess: this.nameProcess,
                namePhase: this.namePhase,
                data: { message: 'Se hizo un cambio a un formato creado es esta actividad' }
              })
          })
        )
        .subscribe({
          next: () => {
            if (typeof callback == 'function') {
              callback(JSON.stringify({ report: this.updateReport?.id }));
            } else {
              MessageHelper.successMessage('Reporte guardado', 'El reporte se guardo correctamente');
            }
          },
          error: (error) => {
            MessageHelper.errorMessage('No se puede almacenar la información por el momento, consulte a su administrador');
          }
        });
    };

    if (decisionMessage) {
      MessageHelper.decisionMessage(
        'Guardar Reporte',
        '¿Desea guardar el reporte?',
        submit
      );
    } else {
      submit();
    }

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
      case 'show_notification':
        this.notification(commands.args);
        break;
      default:
        console.log('Comando no reconocido');
    }
  }

  reloadStructureFormat() {
    this.updateReport = null;
    this.lastReport = null;
    this.loadStructure = false;
    this.form.get('form')?.reset();
    this.editorArray = [];
    this.categories = [];
    this.loadStructureFormat([], true);
  }
  loadStructureFormat(args?: any, reload = false, sync = false) {

    if (this.generateFormat == '' && this.namePhase == '' && this.nameProcess == '') {
      if (args.format.namePhase == '' ||
        args.format.nameProcess == '' ||
        args.format.generateFormat == '')
        return;
      else {
        this.generateFormat = args.format.generateFormat ?? '';
        this.namePhase = args.format.namePhase ?? '';
        this.nameProcess = args.format.nameProcess ?? ''
        this.project_id = args.project_id;
        this.process_id = args.process_id;
      }
    }

    let data: any = this.lastReport ? { lasted_related_report_id: this.lastReport.id, reload: reload } : { reload: reload }
    data = this.updateReport ? { ...data, last_report_id: this.updateReport.id } : data;
    if (!this.loadStructure || reload || sync) {
      this.loadStructure = true;
      MessageHelper.showLoading();
      this.dispacher.getStructureFormat(
        this.project_id,
        this.process_id,
        {
          namePhase: this.namePhase,
          nameProcess: this.nameProcess,
          data: data
        })
        .subscribe({
          next: (value: any) => {

            this.lastReport = typeof value.lasted_related_report_id != 'undefined'
              ? value.lasted_related_report_id
              : this.lastReport;
            this.updateReport = typeof value.id_report != 'undefined' ? {
              id: value.id_report,
              name: '',
              name_phase: this.namePhase,
              name_process: this.nameProcess,
              process_id: this.process_id,
              project_id: this.project_id,
              data: {}
            } : this.updateReport;

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
            }, 400);

            MessageHelper.hide();

          },
          error: async (error: any) => {

            console.log('error.code --> ', error);
            if (error.error.code == 422) {
              MessageHelper.infoMessage('Tienes que seleccionar un formato previo de referencia');
            } else {
              MessageHelper.errorMessage('No se puede generar la estructura en este momento');
            }
            this.loadStructure = false;
          },
        });
    } else {
      console.log("No se puede cargar la estructura en este momento");
    }

  }

  generateReport() {

    if (!this.loadStructure) {
      MessageHelper.errorMessage('Primero tiene que cargarse el reporte');
      return;
    }

    console.log('generating report');
    if (this.namePhase == '' && this.nameProcess == '') return;
    this.loaderService.showFullScreenLoader();
    console.log('generating report', this.form.controls.format.value);
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

  openDialogLastedRelatedReports(related: boolean = false) {

    if (!this.loadStructure && !related) {
      MessageHelper.errorMessage('Primero tiene que cargarse el reporte');
      return;
    }

    let uri = related ? 'getLastedRelatedReports' : 'getLastedReports';


    this.reportConfigurationService.setData(
      this.project_id,
      this.process_id,
      { namePhase: this.namePhase, nameProcess: this.nameProcess, uri: uri }
    );

    this.popupService
      .openTablePopup({ viewClass: ReportConfigurationView, title: "Selecciona un reporte", options: { isMulti: false } })
      .subscribe((report: ReportConfigurationDto) => {
        if (report) {
          if (related) {
            this.lastReport = report;
            this.loadStructureFormat([], true);

          } else {
            this.updateReport = report;
            // this.loadStructureFormat([], true);
            console.log('report   ----> ', report);
            if (report.data.content) {
              this.form.get('form')?.reset();
              this.editorArray = [];
              this.editorArray = report.data.content.map((item: any) => {
                return {
                  name: item.name,
                  controlName: item.name,
                };
              });

              let patch = report.data.content.reduce((acc: any, item: any) => {
                //  @ts-ignore
                acc[item.name] = item.text;
                return acc;
              }, {});

              setTimeout(() => {
                this.form.patchValue({ format: patch });
              }, 200);

              if (report.data.lasted_related_report_id) {
                this.lastReport = {
                  name: '',
                  id: report.data.lasted_related_report_id,
                  data: {},
                  name_process: this.nameProcess,
                  name_phase: this.namePhase,
                  project_id: this.project_id,
                  process_id: this.process_id,
                };
              }
            }
          }
        }
      });
  }
  notification(data: { namePhase: string, nameProcess: string, message: string }) {
    console.log("entrada de notiticación ---> ", data, this.nameProcess, this.namePhase);
    if (data.namePhase == this.namePhase && data.nameProcess == this.nameProcess) {
      this.textNotification = data.message;
      this.showNotification = true;

      setTimeout(() => {
        this.showNotification = false;
      }, 40000);
    }
  }
}