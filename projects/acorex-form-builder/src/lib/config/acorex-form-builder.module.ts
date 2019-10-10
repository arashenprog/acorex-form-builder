import { NgModule } from '@angular/core';
import { AXFDesignerModule } from '../pages/designer/designer.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ACoreXUIModule } from 'acorex-ui';
import { ACFToolsBoxModule } from '../pages/tools-box/tools-box.module';
import { AXFGenericWidgetsModule } from '../widgets/widgets.module';

const MODULES = [
  RouterModule,
  FormsModule,
  AXFDesignerModule,
  ACoreXUIModule,
  ACFToolsBoxModule,
  AXFGenericWidgetsModule
]

@NgModule({
  declarations: [],
  imports: [
    ...MODULES
  ],
  exports: [...MODULES],

})
export class ACoreXFormBuilderModule { }
