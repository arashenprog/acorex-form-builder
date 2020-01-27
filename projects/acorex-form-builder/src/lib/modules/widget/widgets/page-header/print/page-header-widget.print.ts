import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AXFWidgetPrint } from '../../../config/widget';

@Component({
    selector: '[axf-page-header]',
    templateUrl: './page-header-widget.print.html', 
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class AXFPageHeaderWidgetPrint extends AXFWidgetPrint {

    constructor() { 
         super();
    }
}
