import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { AXFWidgetView } from '../../../config/widget';

@Component({
    selector: '[axf-container]',
    templateUrl: './container-widget.view.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AXFContainerWidgetView extends AXFWidgetView {

    @ViewChild("el") el: ElementRef<HTMLElement>;

    constructor(private hostElement: ElementRef<HTMLTableCellElement>, protected cdr: ChangeDetectorRef) {
        super();
    }


    onRender() { 
        if (this.el) {
            this.applyStyle(this.el.nativeElement);
            this.cdr.markForCheck();
        }
        this.cdr.markForCheck(); 
    }
}

