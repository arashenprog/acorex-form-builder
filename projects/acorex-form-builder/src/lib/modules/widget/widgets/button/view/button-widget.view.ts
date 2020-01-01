import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { AXFWidgetView } from '../../../config/widget';

@Component({
    selector: '[axf-button]',
    templateUrl: './button-widget.view.html',
    styleUrls: ['./button-widget.view.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFButtonWidgetView extends AXFWidgetView {


    type: string;
    text: string;
    size: string;
    

    constructor() {
        super();
    }


    handleClickEvent(e: MouseEvent) {
        this.invokeEvent("onClick");
    }
}

