import { Component, ChangeDetectionStrategy} from '@angular/core';
import { AXFWidgetPrint } from '../../../config/widget';

@Component({
    selector: "[axf-widget-page-break]",
    template: `<div style="page-break-after: always;"></div>`,
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class AXFPageBreakWidgetPrint extends AXFWidgetPrint {
    constructor() {
        super()
    }
  
}
