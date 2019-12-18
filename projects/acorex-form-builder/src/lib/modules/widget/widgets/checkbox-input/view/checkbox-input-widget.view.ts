import { Component, OnInit, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AXFWidgetView } from '../../../config/widget';

@Component({
    templateUrl: './checkbox-input-widget.view.html',
    styleUrls: ['./checkbox-input-widget.view.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFCheckboxInputWidgetView extends AXFWidgetView {

    value: boolean ;
    label: string;

    constructor(private el: ElementRef<HTMLElement>,private cdr: ChangeDetectorRef) {
        super();
    }


    onRender(): void {
        this.applyStyle(this.el.nativeElement.querySelector("label"));
        this.cdr.markForCheck();
    }
}
