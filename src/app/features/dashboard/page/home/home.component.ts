import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import Chart from 'chart.js/auto';
import { forkJoin } from 'rxjs';
import { ProcedureService } from 'src/app/data/services/procedure.service';
import { selectRole } from 'src/app/state/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  role$ = this.store.select(selectRole);

  constructor(
    private store: Store,
    private procedureService: ProcedureService,
  ) {}

  ngOnInit() {
    forkJoin([
      this.procedureService.graphsRegistered(),
      this.procedureService.graphsWithoutData(),
      this.procedureService.graphsWithoutShape(),
      this.procedureService.graphsWithoutDocument(),
    ]).subscribe({
      next: ([registered, withoutData, withoutShape, withoutDocument]: [
        any,
        any,
        any,
        any,
      ]) => {
        this.createChart('registered', registered);
        this.createChart('withoutData', withoutData);
        this.createChart('withoutShape', withoutShape);
        this.createChart('withoutDocuments', withoutDocument);
      },
    });
  }

  private rgbRandomColor(withAlpha = false) {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    const a = withAlpha ? Math.random() : 1;
    return `rgba(${r},${g},${b},${a})`;
  }

  private createChart(id: string, data: any) {
    const ctx = document.getElementById(id);
    console.log(ctx);

    new Chart(ctx as any, {
      type: 'bar',
      data: {
        labels: data.labels,
        datasets: [
          {
            label: data.datasets.map((item: any) => item.label),
            data: data.datasets.map((item: any) => item.data),
            borderWidth: 1,
            backgroundColor: data.datasets.map(() => this.rgbRandomColor(true)),
            borderColor: data.datasets.map(() => this.rgbRandomColor()),
          },
        ],
      },
    });
  }
}
