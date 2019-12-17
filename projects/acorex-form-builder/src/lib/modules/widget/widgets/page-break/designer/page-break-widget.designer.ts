import { Component, ChangeDetectionStrategy} from '@angular/core';
import { AXFWidgetDesigner } from '../../../config/widget';

@Component({
    selector: "[axf-widget-page-break]",
    template: `<div style="page-break-after: always;padding: 5px 0px;"><hr style="border-top: 1px dashed red;"></div>`,
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class AXFPageBreakWidgetDesigner extends AXFWidgetDesigner {
    constructor() {
        super()
    }
  
}
