import { Component, OnInit, ViewEncapsulation, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AXFWidgetDesigner } from '../../../config/widget';


@Component({
    selector: "[axf-widget-checkbox]",
    templateUrl: './checkbox-input-widget.designer.html',
    styleUrls: ['./checkbox-input-widget.designer.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class AXFCheckboxInputWidgetDesigner extends AXFWidgetDesigner {


    value: boolean;
    label:string;
    constructor(private el: ElementRef<HTMLElement>,private cdr: ChangeDetectorRef) {
        super()
    }

    onRender(): void {
        this.applyStyle(this.el.nativeElement.querySelector("label"));
        this.cdr.markForCheck();
    }

}
