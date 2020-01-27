import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AXFWidgetView } from '../../../config/widget';

@Component({
    selector: '[axf-page-footer]',
    templateUrl: './page-footer-widget.view.html',
    //styleUrls: ['./page-footer-widget.view.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: { role: "page-footer" }
})
export class AXFPageFooterWidgetView extends AXFWidgetView {

    constructor() {
        super();
    } 
}
