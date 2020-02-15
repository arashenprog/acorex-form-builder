import { Component, OnInit, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AXFWidgetView, AXFValueWidgetView } from '../../../config/widget';

@Component({
    templateUrl: './checkbox-input-widget.view.html',
    styleUrls: ['./checkbox-input-widget.view.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFCheckboxInputWidgetView extends AXFValueWidgetView {
 
    label: string;

    constructor(private el: ElementRef<HTMLElement>,protected cdr: ChangeDetectorRef) {
        super(cdr);
    }


    onRender(): void {
        // this.applyStyle(this.el.nativeElement.querySelector("label"));
        // this.cdr.markForCheck();
    }
}
