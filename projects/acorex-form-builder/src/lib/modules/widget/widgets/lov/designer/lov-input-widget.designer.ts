import { Component, ViewEncapsulation, ElementRef, ViewChild, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { AXFDataSourceOption } from '../../../../property-editor/editors/data-source/data-source.class';
import { AXFWidgetDesigner } from '../../../config/widget';

@Component({
    selector: "[axf-widget-text]",
    templateUrl: './lov-input-widget.designer.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFLovInputWidgetDesigner extends AXFWidgetDesigner {

    @ViewChild("el") el: ElementRef<HTMLElement>;

    dataSource: AXFDataSourceOption;
    constructor(private cdr: ChangeDetectorRef) {
        super()
    }
    

    onRender(): void {
        if (this.el)
            this.applyStyle(this.el.nativeElement);
         this.cdr.markForCheck();
    }

   
}




