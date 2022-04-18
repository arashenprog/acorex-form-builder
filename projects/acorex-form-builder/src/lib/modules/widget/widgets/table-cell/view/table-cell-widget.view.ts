import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef, ViewEncapsulation } from '@angular/core';
import { AXFWidgetView } from '../../../config/widget';

@Component({
    selector: 'td',
    templateUrl: './table-cell-widget.view.html',
    styleUrls: ['./table-cell-widget.view.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class AXFTableCellWidgetView extends AXFWidgetView {

    rIndex: number;
    title:string;
    constructor(
        private el: ElementRef<HTMLTableCellElement>,
        private cdr: ChangeDetectorRef) {
        super();
    }

    onRender() {
        this.applyStyle(this.el.nativeElement);
        if (this['colspan']) {
            this.el.nativeElement.colSpan = this['colspan'];
        }
        if (this['rowspan']) {
            this.el.nativeElement.rowSpan = this['rowspan'];
        }
        if (!this['width']) {
            this.el.nativeElement.style.width = '100px';
        }
        if(this.rIndex>-1 && this.title && this.title!="")
        {
            this.el.nativeElement.setAttribute("data-title",this.title)
        }
        // if (this['data_header']) {
        //     this.el.nativeElement.setAttribute('data-header', this['data_header']); 
        // }
        this.cdr.detectChanges();
    }
}

