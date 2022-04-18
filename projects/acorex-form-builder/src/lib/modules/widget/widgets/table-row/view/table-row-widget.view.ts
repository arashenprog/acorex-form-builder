import { Component, OnInit, ChangeDetectorRef, ElementRef, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { AXFWidgetView } from '../../../config/widget';

@Component({
    selector: 'tr',
    templateUrl: './table-row-widget.view.html',
    styleUrls:['./table-row-widget.view.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class AXFTableRowWidgetView extends AXFWidgetView {

    rIndex:number;

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

