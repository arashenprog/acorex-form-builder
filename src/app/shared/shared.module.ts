import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ACoreXSPAModule } from "acorex-spa";
import { ACoreXUIModule } from "acorex-ui";

@NgModule({
  declarations: [],
  imports: [CommonModule, ACoreXUIModule, ACoreXSPAModule],
  exports: [],
  providers: []
})
export class SharedModule {}
