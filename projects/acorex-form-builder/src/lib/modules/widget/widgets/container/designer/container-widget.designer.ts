import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';
import { AXFWidgetDesigner } from '../../../config/widget';
import { AXFWidgetPickerService } from '../../../services/template/picker.service';

@Component({
    selector: '[axf-container]',
    templateUrl: './container-widget.designer.html',
    styleUrls: ['./container-widget.designer.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush

})
export class AXFContainerWidgetDesigner extends AXFWidgetDesigner {
  

    placeholder:string;

    constructor( private cdr: ChangeDetectorRef,
        private hostElement: ElementRef<HTMLTableCellElement>) {
        super();
    }  

    onRender() {
        if (this.hostElement) {
            this.applyStyle(this.hostElement.nativeElement);
        }
        this.cdr.markForCheck();
    }
}

