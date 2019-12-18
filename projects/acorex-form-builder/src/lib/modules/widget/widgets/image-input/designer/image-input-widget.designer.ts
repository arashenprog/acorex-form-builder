import { Component, ViewEncapsulation, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AXFWidgetDesigner } from '../../../config/widget';


@Component({
    selector: "[axf-widget-image]",
    templateUrl: './image-input-widget.designer.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class AXFImageInputWidgetDesigner extends AXFWidgetDesigner {


    value: string;
    height:number;
    width:number;
    alt:string;
    constructor(private el: ElementRef<HTMLElement>,private cdr: ChangeDetectorRef) {
        super()
    }

    onRender(): void {
        this.applyStyle(this.el.nativeElement.querySelector("img"));
        this.cdr.markForCheck();
    }

}