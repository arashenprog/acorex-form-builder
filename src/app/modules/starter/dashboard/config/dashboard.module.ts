import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StarterDashboardPage } from "../pages/dashboard.page";
import { ACoreXUIModule } from 'acorex-ui';
import { ACoreXSPAModule } from 'acorex-spa';

const PAGES = [StarterDashboardPage];

@NgModule({
  declarations: [...PAGES],
  imports: [CommonModule, ACoreXUIModule, ACoreXSPAModule],
  exports: [...PAGES],
  providers: [],
  entryComponents: [...PAGES]
})
export class StarterDashboardModule { }
