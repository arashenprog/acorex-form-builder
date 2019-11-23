import { NgModule, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXFRowWidgetModule } from '../widgets/row/row.module';
import { AXFColWidgetModule } from '../widgets/col/col.module';
import { WidgetInjector } from './widget';
import { AXFWidgetSharedModule } from '../shared/shared.module';
import { AXFTextBlockWidgetModule } from '../widgets/text-block/text-block.module';
import { AXFPageBreakWidgetModule } from '../widgets/page-break/page-break.module';
import { AXFDateInputWidgetModule } from '../widgets/date-input/date-input.module';
import { AXFPagePageWidgetModule } from '../widgets/page/page.module';
import { AXFSignatureInputWidgetModule } from '../widgets/signature-input/signature-input.module';
import { AXFImageInputWidgetModule } from '../widgets/image-input/image-input.module';
import { AXFCheckboxInputWidgetModule } from '../widgets/checkbox-input/checkbox-input.module';
import { AXFTextInputWidgetModule } from '../widgets/text-input/text-input.module';
import { AXFPageOutletWidgetModule } from '../widgets/outlet/outlet.module';



const MODULES = [
    CommonModule,
    AXFWidgetSharedModule,
    AXFRowWidgetModule,
    AXFColWidgetModule,
    AXFTextBlockWidgetModule,
    AXFPageBreakWidgetModule,
    AXFDateInputWidgetModule,
    AXFPagePageWidgetModule,
    AXFTextInputWidgetModule,
    AXFCheckboxInputWidgetModule,
    AXFImageInputWidgetModule,
    AXFSignatureInputWidgetModule,
    AXFPageOutletWidgetModule
];

@NgModule({
    declarations: [],
    imports: [...MODULES],
    exports: [...MODULES],
    providers: [],
})
export class AXFWidgetModule {
    constructor(injector: Injector) {
        WidgetInjector.instance = injector;
    }
}