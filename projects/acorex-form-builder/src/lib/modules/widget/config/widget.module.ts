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
import { AXFImageWidgetModule } from '../widgets/image/image-view.module';
import { AXFCheckboxInputWidgetModule } from '../widgets/checkbox-input/checkbox-input.module';
import { AXFTextInputWidgetModule } from '../widgets/text-input/text-input.module';
import { AXFTextAreaWidgetModule } from '../widgets/text-area/text-area.module';
import { AXFPageOutletWidgetModule } from '../widgets/outlet/outlet.module';
import { AXFListInputWidgetModule } from '../widgets/list-input/list-input.module';
import { AXFListSecondInputWidgetModule } from '../widgets/listsecond-input/listsecond-input.module';
import { AXFDropdownInputWidgetModule } from '../widgets/dropdown-input/dropdown-input.module';
import { AXFButtonWidgetModule } from '../widgets/button/button.module';
import { AXFGridInputWidgetModule } from '../widgets/grid-input/grid-input.module';
import { AXFPanelWidgetModule } from '../widgets/panel/panel.module';
import { AXFAPITemplateService } from '../services/template/template-api.service';
import { AXFTemplateService } from '../services/template/template.service';
import { AXFTimeInputWidgetModule } from '../widgets/time-input/time-input.module';
import { AXFTableWidgetModule } from '../widgets/table/table.module';
import { AXFTableRowWidgetModule } from '../widgets/table-row/table-row.module';
import { AXFTableCellWidgetModule } from '../widgets/table-cell/table-cel.module';
import { AXFRepeaterlWidgetModule } from '../widgets/repeater/repeater.module';
import { AXFPageHeaderWidgetModule } from '../widgets/page-header/page-header.module';
import { AXFPageFooterWidgetModule } from '../widgets/page-footer/page-footer.module';
import { AXFNumberInputWidgetModule } from '../widgets/number-input/number-input.module';
import { AXFImageInputWidgetModule } from '../widgets/image-input/image-input.module';
import { AXFContainerWidgetModule } from '../widgets/container/container.module';
import { AXFFileUploadWidgetModule } from '../widgets/file-upload/file-upload.module';
//import { AXFMapWidgetModule } from '../widgets/map/map.module';
import { AXFQuestionWidgetModule } from '../widgets/question/question.module';

const MODULES = [
    CommonModule,
    AXFWidgetSharedModule,
    AXFRowWidgetModule,
    AXFColWidgetModule,
    AXFTextBlockWidgetModule,
    AXFPageBreakWidgetModule,
    AXFDateInputWidgetModule,
    AXFTimeInputWidgetModule,
    AXFPagePageWidgetModule,
    AXFTextInputWidgetModule,
    AXFNumberInputWidgetModule,
    AXFTextAreaWidgetModule,
    AXFCheckboxInputWidgetModule,
    AXFImageWidgetModule,
    AXFSignatureInputWidgetModule,
    AXFPageOutletWidgetModule,
    AXFListInputWidgetModule,
    AXFListSecondInputWidgetModule,
    AXFDropdownInputWidgetModule,
    AXFButtonWidgetModule,
    AXFGridInputWidgetModule,
    AXFPanelWidgetModule,
    AXFTableWidgetModule,
    AXFTableRowWidgetModule,
    AXFTableCellWidgetModule,
    AXFRepeaterlWidgetModule,
    AXFPageHeaderWidgetModule,
    AXFPageFooterWidgetModule,
    AXFImageInputWidgetModule,
    AXFContainerWidgetModule,
    AXFFileUploadWidgetModule,
    //AXFQuestionWidgetModule,
    //AXFMapWidgetModule
];

@NgModule({
    declarations: [],
    imports: [...MODULES],
    exports: [...MODULES],
    providers: [{
        provide: AXFTemplateService,
        useClass :AXFAPITemplateService
    }],
})
export class AXFWidgetModule {
    constructor(injector: Injector) {
        WidgetInjector.instance = injector;
    }
}