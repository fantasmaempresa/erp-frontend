import { Component } from '@angular/core';
import * as shape from 'd3-shape';
import { Edge, Layout, Node } from '@swimlane/ngx-graph';
import { MyProjectsService } from '../../../../data/services';
import { ActivatedRoute, Router } from "@angular/router";
import { ResumeProcessProjectDto } from '../../../../data/dto/ResumeProcessProject.dto';
import { MatDialog } from '@angular/material/dialog';
import { DialogResumeProjectComponent } from '../../../../shared/components/dialog-resume-project/dialog-resumen-project.component';
import { ProcedureDto } from 'src/app/data/dto';
import { Observable } from 'rxjs';
import { UntypedFormControl } from '@angular/forms';
import { SharedDataService } from 'src/app/data/services/shared-data.service';

@Component({
  selector: 'app-resume-process',
  templateUrl: './resume-process.component.html',
  styleUrls: ['./resume-process.component.scss'],
})
export class ResumeProcessComponent {
  form: any;
  formControl = new UntypedFormControl();
  projectId!: number;
  processId!: number;
  edges: Edge[] = [];
  nodes: Node[] = [];
  curveType: string = 'Bundle';
  curve: any = shape.curveCardinal;

  constructor(
    myProjects: MyProjectsService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router,
    private synchronizer: SharedDataService,
  ) {
    const { id, idProcess } = this.route.snapshot.params;
    this.projectId = Number(id);
    this.processId = Number(idProcess);

    myProjects.getResumeProcess(this.projectId, this.processId).subscribe({
      next: async (resume: any) => {
        console.log('resume --> ', resume);
        this.constructDiagram(resume.resume);
      },
    });
  }

  constructDiagram(resumeProcessProject: ResumeProcessProjectDto[]) {
    let beforeResume: ResumeProcessProjectDto;
    resumeProcessProject.forEach((resume: ResumeProcessProjectDto) => {
      let node: Node = {
        id: resume.id.toString(),
        label: resume.detail_project.phase?.name,
        data: resume.detail_project.form_data,
      };
      if (beforeResume) {
        this.edges.push({
          id: resume.id.toString(),
          source: beforeResume.id.toString(),
          target: resume.id.toString(),
        });
      }
      beforeResume = resume;
      this.nodes.push(node);
    });
    this.nodes = [...this.nodes];
    this.edges = [...this.edges];
  }

  click(node: Node) {
    console.log('node.data --> ', node);
    this.dialog.open(DialogResumeProjectComponent, { data: node.data });
    this.form = { form: node.data.form, type_form: node.data.type_form };

    this.synchronizer.executionCommand(
      {
        args: node.data.values_form,
        command: 'patchForm',
      }
    );

    if (node.data.type_form == 2 && node.data.form.withFormat) {
      setTimeout(() => {
        this.synchronizer.executionCommand({
          args: { project_id: this.projectId, process_id: this.processId, format: node.data.form.formats },
          command: 'loadStructureFormat',
        });

        this.synchronizer.executionCommand({
          args: {
            preview: true,
            check_box: false,
            post_add: false,
            sync: false,
            save: false,
            download: true,
          },
          command: 'set_controls',
        });
      }, 300);
    }

  }

  async back() {
    await this.router.navigate(["./../../../../"], { relativeTo: this.route });
  }
}
