import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AXFWidgetView } from '../../../config/widget';

@Component({
    selector: '[axf-panel]',
    templateUrl: './panel-widget.view.html',
    styleUrls: ['./panel-widget.view.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFPanelWidgetView extends AXFWidgetView {

    caption: string;
    allowCollapse:boolean;
    collapsed:boolean;

    constructor() {
        super();
    }
}

