import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BuilderPage } from "../pages/builder.page";
import { ACoreXUIModule } from 'acorex-ui';
import { ACoreXSPAModule } from 'acorex-spa';

const pages = [BuilderPage];

@NgModule({
  declarations: [...pages],
  imports: [CommonModule, ACoreXUIModule, ACoreXSPAModule],
  exports: [...pages],
  providers: [],
  entryComponents: [...pages]
})
export class BuilderModule { }
