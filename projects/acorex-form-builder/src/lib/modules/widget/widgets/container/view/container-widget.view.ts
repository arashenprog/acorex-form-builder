import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { AXFWidgetView } from '../../../config/widget';

@Component({
    selector: '[axf-container]',
    templateUrl: './container-widget.view.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AXFContainerWidgetView extends AXFWidgetView {

    @ViewChild('ff', { read: ElementRef, static: false })
    el: ElementRef<HTMLElement>;

    constructor(protected cdr: ChangeDetectorRef) {
        super();
    }


    onRender() {
        debugger;
        this.cdr.markForCheck();
        this.cdr.detectChanges();
        if (this.el) {
            this.applyStyle(this.el.nativeElement);
        }
    }
}

