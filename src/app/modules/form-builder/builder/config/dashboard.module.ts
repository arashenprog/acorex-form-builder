import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BuilderPage } from "../pages/builder.page";
import { ACoreXUIModule } from 'acorex-ui';

const pages = [BuilderPage];

@NgModule({
  declarations: [...pages],
  imports: [CommonModule, ACoreXUIModule],
  exports: [...pages],
  providers: [],
  entryComponents: [...pages]
})
export class BuilderModule { }
