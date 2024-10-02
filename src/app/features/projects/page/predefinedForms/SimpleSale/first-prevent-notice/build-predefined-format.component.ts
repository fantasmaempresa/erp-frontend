import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { PredefinedFormLifeCycle } from 'src/app/core/interfaces/PredefinedFormLifeCycle';
import { ExcecutePhasePredefinedService } from 'src/app/data/services/excecute-phase-predefined.service';
import { SharedDataService } from 'src/app/data/services/shared-data.service';
import { UnitFormComponent } from 'src/app/features/unit/page/unit-form/unit-form.component';
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
  formControl:  FormControl = new FormControl();
  title: string = 'Build Predefined Format';
  previewBuilderForm = false;

  testData = {
    content: [
      { name: "parragraph_1", text: "ASUNTO: PRIMER AVISO PREVENTIVO y CERTIFICADO DE LIBERTAD DE GRAVAMEN.", },
      { name: "parragraph_2", text: "AL C. REGISTRADOR PÚBLICO DE LA PROPIEDAD, DEL DISTRITO JUDICIAL DE _____", },
      { name: "parragraph_3", text: "Con fundamento en lo dispuesto por el artículo 92, fracción I  de la Ley del Registro Público de la Propiedad y del Comercio del Estado Libre y Soberano de Puebla, y bajo protesta de decir verdad manifiesto que se tuvieron a la vista los documentos que exige el artículo 33 del reglamento de la ley del notariado respetuosamente solicito:", },
      { name: "parragraph_4", text: "Se haga la anotación del PRIMER AVISO PREVENTIVO de las operaciones -> (aquí sería en plural si solo es una operación) de: a).- INSCRIPCIÓN DEL NOMBRAMIENTO DEL CARGO DE ALBACEA DEFINITIVO; b).- PROTOCOLIZACIÓN DE INVENTARIO Y AVALÚO, c).- APLICACIÓN Y ADJUDICACIÓN PARCIAL DE BIENES HEREDITARIOS, y d) COMPRA VENTA, (aquí en listas todas las operaciones que tenga asígandas en el orden que se guardaron) respecto del inmueble, cuyos datos de identificación y contratantes menciono más adelante y expida CERTIFICADO DE LIBERTAD de GRAVAMEN donde conste la anotación del primer aviso preventivo, la situación registral que reporte el bien y la constancia relativa a las declaratorias de provisiones, usos, reservas y destinos, que estuvieren inscritos en forma individualizada en su folio:", },
      { name: "parragraph_5", text: "DE CUJUS:___", },
      { name: "parragraph_6", text: "ALBACEA DEFINITIVO: ___", },
      { name: "parragraph_7", text: "POSIBLE ADJUDICATARIO Y VENDEDOR: ___", },
      { name: "parragraph_8", text: "POSIBLE COMPRADORA: ___", },
      { name: "parragraph_9", text: "DESCRIPCIÓN DEL INMUEBLE: ___", },
      { name: "parragraph_10", text: "DATOS DE REGISTRO:", },
      { name: "parragraph_11", text: "Heroica Puebla de Zaragoza, a _______", },
      { name: "parragraph_12", text: "Dra. Norma Romero Cortés", },
      { name: "parragraph_13", text: "Notario Público Titular", },
      { name: "parragraph_14", text: "___/___", },
      { name: "parragraph_15", text: "Exp.____" },
    ],
    data: [
      { name: "operations", sheets: ["ADJUDICACION POR REMATE", "ADJUDICACION POR REMATE"] },
        { name: "grantors1", sheets: ["EQUIPAMIENTOS REGIONALES DEL SUR, S. DE R.L. DE C.V.,", "DELEGADO ESPECIAL"] },
        { name: "grantors2", sheets: ["EQUIPAMIENTOS REGIONALES DEL SUR, S. DE R.L. DE C.V.,", "DELEGADO ESPECIAL"] },
        { name: "grantors3", sheets: ["EQUIPAMIENTOS REGIONALES DEL SUR, S. DE R.L. DE C.V.,", "DELEGADO ESPECIAL"] },
    ]
  };

  constructor(
    private route: ActivatedRoute,
    private synchronizer: SharedDataService,
    private dispacher: ExcecutePhasePredefinedService,
  ) {
    // this.dispacher.getStructureFormat().subscribe();
    //TODO: Aquí sel llena los arrays y se hace la petición
    this.form = new UntypedFormGroup({
      format : new FormControl('', []),
    });

    this.categories = this.testData.data;
    this.editorArray = this.testData.content.map((item) => {
      return {
        name: item.name,
        controlName: item.name,
        value: item.text
      };
    });

    this.synchronizer.executionCommand$.subscribe((commands) => {
      console.log('this.synchronizer.executionCommand$ ---> ', commands);
      this.executeCommands(commands);
    });
  }

  ngOnInit(): void {

  }
  ngOnDestroy(): void { }

  next(args?: { process_id: number; project_id: number; data: any; }, callback?: Function) {

  }

  prev(args?: { process_id: number; project_id: number; data: any; }, callback?: Function) {

  }

  writeValue(value: any) {

  }

  onSubmit() {
    console.log('Formart -->', this.form.value);
    console.log('Formart -->', this.formControl.value);
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
    // this.dispacher.getStructureFormat(
    //   args.project_id,
    //   args.process_id,
    //   {
    //     namePhase: this.namePhase,
    //     nameProcess: this.nameProcess,
    //     data: {}
    //   })
    //   .subscribe({
    //     next: (value: any) => {
    //       this.categories = value.categories;
    //       this.editorArray = value.editor;
    //     }
    //   });
  }
}
