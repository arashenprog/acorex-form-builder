import { Component, ElementRef, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { AXFWidgetView } from '../../../config/widget';

@Component({
    template: '',
    selector: "[axf-widget-text]",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFTextBlockWidgetView extends AXFWidgetView {

    text: string;


    constructor(private hostElement: ElementRef<HTMLDivElement>, private cdr: ChangeDetectorRef) {
        super();
    }

    onRender(): void {
        this.hostElement.nativeElement.innerHTML = this.text;
        //this.hostElement.nativeElement.style.display = "inline";
        this.applyStyle(this.hostElement.nativeElement);
        this.cdr.markForCheck();
    }
}
