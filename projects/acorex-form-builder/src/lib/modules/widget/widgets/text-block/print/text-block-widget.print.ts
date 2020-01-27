import { Component, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AXFWidgetPrint } from '../../../config/widget';

@Component({
    template:'',
    selector: '[axf-text-block]',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFTextBlockWidgetPrint extends AXFWidgetPrint {

    text: string;

    constructor(private hostElement: ElementRef,private cdr:ChangeDetectorRef) {
        super();
    }

    onRender(): void {
        this.hostElement.nativeElement.innerHTML = this.text; 
        this.applyStyle(this.hostElement.nativeElement);
        this.cdr.markForCheck();
    }
}
