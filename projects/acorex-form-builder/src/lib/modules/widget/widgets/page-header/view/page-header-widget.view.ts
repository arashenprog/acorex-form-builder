import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AXFWidgetView } from '../../../config/widget';

@Component({
    selector: '[axf-page-header]',
    templateUrl: './page-header-widget.view.html',
    //styleUrls: ['./header-widget.view.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: { role: "page-header" }
})
export class AXFPageHeaderWidgetView extends AXFWidgetView {

    constructor() {
        super();
    }
}
