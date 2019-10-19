import { Component} from '@angular/core';
import { AXFWidgetView } from '../../../config/widget';

@Component({
    selector: "[axf-widget-page-break]",
    template: `<div style="page-break-after: always;"></div>`,
})
export class AXFPageBreakWidgetView extends AXFWidgetView {
    constructor() {
        super()
    }
  
}
