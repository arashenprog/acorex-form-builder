import { Component, OnInit, ChangeDetectionStrategy, ElementRef } from '@angular/core';
import { AXFWidgetPrint } from '../../../config/widget';
import { AXFFormatService } from '../../../services/format.service';

@Component({
    selector: '[axf-container]',
    templateUrl: './container-widget.print.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFContainerWidgetPrint extends AXFWidgetPrint {
 
    constructor(private hostElement: ElementRef<HTMLTableCellElement>) {
        super();
    } 
     
    onRender() {
        if (this.hostElement) {
            this.applyStyle(this.hostElement.nativeElement);
        } 
    } 

}

