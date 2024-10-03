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
  nameProcess = 'DomainTransfer';
  namePhase = 'generateFirstPreventiveNotice';
  categories: CategoryOptions[] = [];
  editorArray: EditorOptions[] = [];
  form: UntypedFormGroup;
  title: string = 'Build Predefined Format';
  previewBuilderForm = true;

  constructor(
    private route: ActivatedRoute,
    private synchronizer: SharedDataService,
    private dispacher: ExcecutePhasePredefinedService,
    private loaderService: LoaderService,
  ) {
    // this.dispacher.getStructureFormat().subscribe();
    //TODO: Aquí sel llena los arrays y se hace la petición
    this.form = new UntypedFormGroup({
      format: new FormControl('', []),
    });
  }

  ngOnInit(): void {
    this.synchronizer.updateLastForm(this.form);

    this.synchronizer.executionCommand$.subscribe((commands) => {
      console.log('this.synchronizer.executionCommand$ ---> ', commands);
      this.executeCommands(commands);
    });

  }
  ngOnDestroy(): void { }

  next(args?: { process_id: number; project_id: number; data: any; }, callback?: Function) {

  }

  prev(args?: { process_id: number; project_id: number; data: any; }, callback?: Function) {

  }

  writeValue(value: any) {
    this.form.reset();
    this.form.patchValue(value);
  }

  onSubmit() {
    console.log('Formart -->', this.form.value);

  }

  executeCommands(commands: { command: string; args?: any; callback?: Function; }) {
    switch (commands.command) {
      case 'loadStructureFormat':
        this.loadStructureFormat(commands.args);
        break;
      case 'netx':
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
    console.log("se pide la estructura del formato");
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
          // this.categories = value.data;

          let patch = value.content.reduce((acc: any, item: any) => {
            //  @ts-ignore
            acc[item.name] = item.text;
            return acc;
          }, {});

          this.form.patchValue({ format: patch });
          this.loaderService.hideLoader();
        },
        error: (error: any) => {
          this.loaderService.hideLoader();
          MessageHelper.errorMessage('No se puede generar la estructura en este momento');
        },
      });
  }
}