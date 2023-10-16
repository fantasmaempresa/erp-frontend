import { Component } from '@angular/core';
import { Node, Edge, ClusterNode } from '@swimlane/ngx-graph';
import { MyProjectsService } from '../../../../data/services';

@Component({
  selector: 'app-resume-process',
  templateUrl: './resume-process.component.html',
  styleUrls: ['./resume-process.component.scss'],
})
export class ResumeProcessComponent {
  edges: Edge[] = [
    {
      id: 'a',
      source: '1',
      target: '2',
    },
    {
      id: 'b',
      source: '1',
      target: '3',
    },
    {
      id: 'c',
      source: '3',
      target: '4',
    },
    {
      id: 'd',
      source: '3',
      target: '5',
    },
    {
      id: 'e',
      source: '4',
      target: '5',
    },
    {
      id: 'f',
      source: '2',
      target: '6',
    },
  ];

  nodes: Node[] = [
    {
      id: '1',
      label: 'Node A',
    },
    {
      id: '2',
      label: 'Node B',
    },
    {
      id: '3',
      label: 'Node C',
    },
    {
      id: '4',
      label: 'Node D',
    },
    {
      id: '5',
      label: 'Node E',
    },
    {
      id: '6',
      label: 'Node F',
    },
  ];

  constructor(myProjects: MyProjectsService) {
    myProjects.getResumeProcess(1,1).subscribe({
      next: async (resume) => {
        console.log('resume --> ', resume);
      },
    });
  }

  click(node: Node) {
    console.log('click -->', node);
  }
}
