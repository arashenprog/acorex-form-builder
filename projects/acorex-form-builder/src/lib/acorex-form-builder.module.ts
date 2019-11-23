import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ACoreXUIModule } from 'acorex-ui';
import { AXFDesignerModule } from './modules/designer/config/designer.module';
import { AXFWidgetModule } from './modules/widget/config/widget.module';
import { AXFLoadTemplateModule } from './modules/loadtemplate/config/loadtemplate.module';
import { AXFTextInputWidgetModule } from './modules/widget/widgets/text-input/text-input.module';
import { AXFViewerModule } from './modules/viewer/config/viewer.module';
import { AXFCheckboxInputWidgetModule } from './modules/widget/widgets/checkbox-input/checkbox-input.module';
import { AXFImageInputWidgetModule } from './modules/widget/widgets/image-input/image-input.module';
import { AXFSignatureInputWidgetModule } from './modules/widget/widgets/signature-input/signature-input.module';
import { AXFListInputWidgetModule } from './modules/widget/widgets/list-input/list-input.module';
import { AXFDropdownInputWidgetModule } from './modules/widget/widgets/dropdown-input/dropdown-input.module'; 


const MODULES = [
  RouterModule,
  FormsModule,
  AXFDesignerModule,
  AXFViewerModule,
  AXFLoadTemplateModule,
  ACoreXUIModule,
  AXFWidgetModule,
  AXFTextInputWidgetModule,
  AXFCheckboxInputWidgetModule,
  AXFImageInputWidgetModule,
  AXFSignatureInputWidgetModule,
  AXFListInputWidgetModule,
  AXFDropdownInputWidgetModule
]

@NgModule({
  declarations: [],
  imports: [
    ...MODULES
  ],
  exports: [...MODULES],

})
export class ACoreXFormBuilderModule { }
