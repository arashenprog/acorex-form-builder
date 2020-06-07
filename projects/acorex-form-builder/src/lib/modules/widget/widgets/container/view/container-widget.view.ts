import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef } from '@angular/core';
import { AXFWidgetView } from '../../../config/widget';

@Component({
    selector: '[axf-container]',
    templateUrl: './container-widget.view.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AXFContainerWidgetView extends AXFWidgetView {

    constructor(private hostElement: ElementRef<HTMLTableCellElement>) {
        super();
    }


    onRender() {
        if (this.hostElement) {
            this.applyStyle(this.hostElement.nativeElement);
        }
    }
}

