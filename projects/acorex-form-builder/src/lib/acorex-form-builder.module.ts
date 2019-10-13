import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ACoreXUIModule } from 'acorex-ui';
import { AXFDesignerModule } from './modules/designer/config/designer.module';
import { AXFWidgetModule } from './modules/widget/config/widget.module';
import { AXFLoadTemplateModule } from './modules/loadtemplate/config/loadtemplate.module';

const MODULES = [
  RouterModule,
  FormsModule,
  AXFDesignerModule,
  AXFLoadTemplateModule,
  ACoreXUIModule,
  AXFWidgetModule
]

@NgModule({
  declarations: [],
  imports: [
    ...MODULES
  ],
  exports: [...MODULES],

})
export class ACoreXFormBuilderModule { }
