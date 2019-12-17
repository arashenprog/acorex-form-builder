import { Component, OnInit, SimpleChanges, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { AXFWidgetDesigner } from '../../../config/widget';

@Component({
    selector: '[axf-button]',
    templateUrl: './button-widget.designer.html',
    styleUrls: ['./button-widget.designer.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFButtonWidgetDesigner extends AXFWidgetDesigner {

    type: string;
    text: string;
    size: string;

    constructor(private cdr: ChangeDetectorRef) {
        super();
    }

    onRender() {
        this.cdr.markForCheck();
    }
}

