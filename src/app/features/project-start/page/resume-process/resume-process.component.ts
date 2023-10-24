import { Component } from '@angular/core';
import { Edge, Node } from '@swimlane/ngx-graph';
import { MyProjectsService } from '../../../../data/services';
import { ActivatedRoute, Router } from "@angular/router";
import { ResumeProcessProjectDto } from '../../../../data/dto/ResumeProcessProject.dto';
import { MatDialog } from '@angular/material/dialog';
import { DialogResumeProjectComponent } from '../../../../shared/components/dialog-resume-project/dialog-resumen-project.component';

@Component({
  selector: 'app-resume-process',
  templateUrl: './resume-process.component.html',
  styleUrls: ['./resume-process.component.scss'],
})
export class ResumeProcessComponent {
  projectId!: number;

  processId!: number;

  edges: Edge[] = [];

  nodes: Node[] = [];

  constructor(
    myProjects: MyProjectsService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router,
  ) {
    const { id, idProcess } = this.route.snapshot.params;
    this.projectId = Number(id);
    this.processId = Number(idProcess);

    myProjects.getResumeProcess(this.projectId, this.processId).subscribe({
      next: async (resume: ResumeProcessProjectDto[]) => {
        console.log('resume --> ', resume);
        this.constructDiagram(resume);
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
     console.log('node.data --> ', node.data);
    this.dialog.open(DialogResumeProjectComponent, { data: node.data });
  }

  // async back() {
  //   await this.router.navigate(["project-start/list"]);
  // }
}
