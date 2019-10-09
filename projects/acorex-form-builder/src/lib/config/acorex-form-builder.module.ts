import { NgModule } from '@angular/core';
import { AXFDesignerModule } from '../pages/designer/designer.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ACoreXUIModule } from 'acorex-ui';
import { ACFToolsBoxModule } from '../pages/tools-box/tools-box.module';

const modules = [
  RouterModule,
  FormsModule,
  AXFDesignerModule,
  ACoreXUIModule,
  ACFToolsBoxModule
]

@NgModule({
  declarations: [],
  imports: [
    ...modules
  ],
  exports: [...modules],

})
export class ACoreXFormBuilderModule { }
