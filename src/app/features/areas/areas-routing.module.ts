import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AreaFormComponent } from './area-form/area-form.component';

const routes: Routes = [
  {
    path: '',
    component: AreaFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AreasRoutingModule {}
