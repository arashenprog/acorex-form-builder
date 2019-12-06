import { NgModule, APP_INITIALIZER } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ACoreXUIModule } from 'acorex-ui';
import { AXFDesignerModule } from './modules/designer/config/designer.module';
import { AXFWidgetModule } from './modules/widget/config/widget.module';
import { AXFViewerModule } from './modules/viewer/config/viewer.module';
import { AXFDataService } from './modules/widget/services/data.service';

export function init_app(dataService: AXFDataService) {
  return () => dataService.init();
}

const MODULES = [
  RouterModule,
  FormsModule,
  AXFDesignerModule,
  AXFViewerModule,
  ACoreXUIModule,
  AXFWidgetModule
]

@NgModule({
  declarations: [],
  imports: [
    ...MODULES
  ],
  providers: [
    AXFDataService,
    { provide: APP_INITIALIZER, useFactory: init_app, deps: [AXFDataService], multi: true },
  ],
  exports: [AXFViewerModule, AXFDesignerModule],

})
export class ACoreXFormBuilderModule { }
