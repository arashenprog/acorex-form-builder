import { Component, OnInit, ElementRef, ChangeDetectorRef, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { AXFWidgetView } from '../../../config/widget';

@Component({
    templateUrl: './date-input-widget.view.html',
    styleUrls: ['./date-input-widget.view.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFDateInputWidgetView extends AXFWidgetView {
    @ViewChild("el1", { static: true }) el1: ElementRef<HTMLElement>;

    constructor(private el: ElementRef<HTMLElement>, private cdr: ChangeDetectorRef) {
        super();
    }

    ngAfterViewInit() {

    }

    onRender(): void {
        // if (this.el1 && this.el1.nativeElement.querySelector("input") != null)
        //     this.applyStyle(this.el1.nativeElement.querySelector("input"));
        this.cdr.markForCheck();
    }

    dataChange(e) {

    }
}
