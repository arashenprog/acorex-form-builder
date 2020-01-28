import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AXFWidgetPrint } from '../../../config/widget';

@Component({
    selector: '[axf-page-footer]',
    templateUrl: './page-footer-widget.print.html', 
    changeDetection:ChangeDetectionStrategy.OnPush,
    host: { role: "page-footer" }
})
export class AXFPageFooterWidgetPrint extends AXFWidgetPrint {

    constructor() { 
         super();
    }
}
