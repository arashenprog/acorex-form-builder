import { Component, OnInit, ElementRef, ChangeDetectorRef, ChangeDetectionStrategy, ViewEncapsulation, ViewChild } from '@angular/core';
import { AXFWidgetView } from '../../../config/widget';
import { AXFTableWidgetFormula } from '../formula';

@Component({
    selector: '[axf-table]',
    templateUrl: './table-widget.view.html',
    styleUrls: ['./table-widget.view.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AXFTableWidgetView extends AXFWidgetView {
    isResponsive:boolean;

    @ViewChild('table', { static: true }) table: ElementRef<HTMLTableElement>;
    constructor(
        private cdr: ChangeDetectorRef) {
        super();
    }

    get formula() {
        return new AXFTableWidgetFormula(this);
    }

    onRender() { 
        if (this.table) {
            this.applyStyle(this.table.nativeElement);
            if(this.isResponsive &&  !(this.table.nativeElement.classList.contains("responsive")))
                    this.table.nativeElement.classList.add("responsive");
            this.cdr.markForCheck();
        }
    }



    getHeader() {
        return this.widgets.filter(c => c.options.isHeader === true);
    }

    getBody() {
        return this.widgets.filter(c => c.options.isHeader === false);
    }
}

