import { Component, ViewEncapsulation, ElementRef, ViewChild, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { AXFWidgetDesigner, AXFWidgetPrint } from '../../../config/widget';

@Component({
    selector: "[axf-widget-text]",
    templateUrl: './lov-input-widget.print.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFLovInputWidgetPrint extends AXFWidgetPrint {

    @ViewChild("el") el: ElementRef<HTMLElement>;

    constructor(private cdr: ChangeDetectorRef) {
        super()
    }

    

    onRender(): void {
        // if (this.el)
        //     this.applyStyle(this.el.nativeElement);
        // this.cdr.markForCheck();
    }

   
}




