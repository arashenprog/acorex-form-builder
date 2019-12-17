import { Component, OnInit, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { AXFWidgetView } from '../../../config/widget';

@Component({
    templateUrl: './image-input-widget.view.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFImageInputWidgetView extends AXFWidgetView {

    value: string;
    height: number;
    width: number;
    alt: string;

    constructor(private el: ElementRef<HTMLElement>) {
        super()
    }


    onRender(): void {
        this.applyStyle(this.el.nativeElement.querySelector("img"));
    }
}