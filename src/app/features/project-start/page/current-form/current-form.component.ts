import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MyProjectsService } from '../../../../data/services/my-projects.service';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-current-form',
  templateUrl: './current-form.component.html',
  styleUrls: ['./current-form.component.scss'],
})
export class CurrentFormComponent implements OnInit {
  projectId!: number;

  processId!: number;

  form$!: Observable<any>;

  formControl = new FormControl();

  constructor(private route: ActivatedRoute, private myProjectService: MyProjectsService) {
    const { id, idProcess } = this.route.snapshot.params;
    this.projectId = Number(id);
    this.processId = Number(idProcess);
  }

  ngOnInit(): void {
    this.form$ = this.myProjectService.getCurrentForm(this.projectId, this.processId);
  }

  nextPhase() {
    this.myProjectService.nextPhase({
      projectId: this.projectId,
      processId: this.processId,
      comment: 'Comentario random para pasar el proyecto',
    });
  }

  prevPhase() {
    this.myProjectService.prevPhase({
      projectId: this.projectId,
      processId: this.processId,
      comment: 'Comentario random para ir para atrás en el proyecto',
    });
  }
}
