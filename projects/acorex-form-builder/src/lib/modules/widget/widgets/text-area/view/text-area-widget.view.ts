import { Component, OnInit, ElementRef, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { AXFWidgetView, AXFValueWidgetView } from '../../../config/widget';

@Component({
    selector: '[axf-widget-text]',
    templateUrl: './text-area-widget.view.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFTextAreaWidgetView extends AXFValueWidgetView {

    placeholder: string;
    rows: number;


    constructor(protected cdr: ChangeDetectorRef) {
        super(cdr);
    }

    onRender(): void {
        this.cdr.markForCheck();
    }
}
