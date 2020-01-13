import { Component, OnInit, ElementRef, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { AXFWidgetDesigner } from '../../../config/widget';

@Component({
    selector: 'tr',
    templateUrl: './table-row-widget.designer.html',
    styleUrls: ['./table-row-widget.designer.scss'],
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class AXFTableRowWidgetDesigner extends AXFWidgetDesigner {

    constructor(
        private el: ElementRef,
        private cdr: ChangeDetectorRef) {
        super();
    }

    onRender() {
        this.applyStyle(this.el.nativeElement);
        this.cdr.markForCheck();
    }
}

