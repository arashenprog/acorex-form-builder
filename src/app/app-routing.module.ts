import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MasterLayout } from './shared/layouts/master.layout';
import { ACoreXFormBuilderModule, ACFDesignerPage, ACFViewerPage } from 'acorex-form-builder';

const routes: Routes = [
  {
    path: "",
    component: MasterLayout,
    children: [
      {
        path: "",
        redirectTo: '/designer',
        pathMatch: 'full'
      },
      {
        path: "view",
        component: ACFViewerPage
      },
      {
        path: "designer",
        component: ACFDesignerPage
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), ACoreXFormBuilderModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
