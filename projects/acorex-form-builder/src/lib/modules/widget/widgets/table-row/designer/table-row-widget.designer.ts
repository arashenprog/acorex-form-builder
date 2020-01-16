import { Component, OnInit, ElementRef, ChangeDetectorRef, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { AXFWidgetDesigner } from '../../../config/widget';

@Component({
    selector: 'tr',
    templateUrl: './table-row-widget.designer.html',
    styleUrls: ['./table-row-widget.designer.scss'],
    changeDetection:ChangeDetectionStrategy.OnPush,
    encapsulation:ViewEncapsulation.None
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

