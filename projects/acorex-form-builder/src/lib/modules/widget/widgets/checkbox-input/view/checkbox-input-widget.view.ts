import { Component, OnInit, ElementRef } from '@angular/core';
import { AXFWidgetView } from '../../../config/widget';

@Component({
    templateUrl: './checkbox-input-widget.view.html',
    styleUrls: ['./checkbox-input-widget.view.scss']
})
export class AXFCheckboxInputWidgetView extends AXFWidgetView {

    value: boolean = true;
    label: string;

    constructor(private el: ElementRef<HTMLElement>) {
        super()
    }


    onRender(): void {
        this.applyStyle(this.el.nativeElement.querySelector("label"));
    }
}
