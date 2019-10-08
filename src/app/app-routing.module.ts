import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MasterLayout } from './shared/layouts/master.layout';
import { ACoreXFormBuilderModule, ACFDesignerPage } from 'acorex-form-builder';

const routes: Routes = [
  {
    path: "",
    component: MasterLayout,
    children: [
      {
        path: "",
        component: ACFDesignerPage
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), ACoreXFormBuilderModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
