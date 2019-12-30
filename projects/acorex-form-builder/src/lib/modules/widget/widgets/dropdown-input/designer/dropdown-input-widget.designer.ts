import { Component, ViewEncapsulation, ElementRef, ViewChild, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { AXFWidgetDesigner } from '../../../config/widget';

@Component({
    selector: "[axf-widget-text]",
    templateUrl: './dropdown-input-widget.designer.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFDropdownInputWidgetDesigner extends AXFWidgetDesigner {

    @ViewChild("el") el: ElementRef<HTMLElement>;

    constructor(private cdr: ChangeDetectorRef) {
        super()
    }

    

    onRender(): void {
        if (this.el)
            this.applyStyle(this.el.nativeElement);
        this.cdr.markForCheck();
    }

   
}




