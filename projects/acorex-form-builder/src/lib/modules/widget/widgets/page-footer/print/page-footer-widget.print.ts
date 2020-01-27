import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AXFWidgetPrint } from '../../../config/widget';

@Component({
    selector: '[axf-page-footer]',
    templateUrl: './page-footer-widget.print.html', 
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class AXFPageFooterWidgetPrint extends AXFWidgetPrint {

    constructor() { 
         super();
    }
}
