import { Component, OnInit, ElementRef, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { AXFWidgetView } from '../../../config/widget';

@Component({
    selector: "[axf-widget-text]",
    templateUrl: './text-area-widget.view.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFTextAreaWidgetView extends AXFWidgetView {

    placeholder: String;
    rows: number;


    constructor(private cdr: ChangeDetectorRef) {
        super()
    }

    onRender(): void {
        this.cdr.markForCheck();
    }
}
