import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { StarterDashboardModule } from "./dashboard/config/dashboard.module";
const ROUTES: Routes = [
  {
    path: "starter/dashboard",
    loadChildren: "./dashboard/config/dashboard.module#StarterDashboardModule"
  }
];
const MODULES = [StarterDashboardModule];
@NgModule({
  declarations: [],
  imports: [...MODULES, RouterModule.forRoot(ROUTES), CommonModule],
  exports: [...MODULES],
  providers: []
})
export class StarterModule {}
