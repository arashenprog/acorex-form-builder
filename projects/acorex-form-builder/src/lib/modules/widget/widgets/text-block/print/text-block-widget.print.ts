import { Component, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AXFWidgetPrint } from '../../../config/widget';

@Component({
    template:'',
    selector: '[axf-text-block]',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFTextBlockWidgetPrint extends AXFWidgetPrint {

    text: String;

    constructor(private hostElement: ElementRef,private cdr:ChangeDetectorRef) {
        super();
    }

    onRender(): void {
        this.hostElement.nativeElement.innerHTML = this.text;
        this.hostElement.nativeElement.style.display="inline";
        this.applyStyle(this.hostElement.nativeElement);
        this.cdr.markForCheck();
    }
}
