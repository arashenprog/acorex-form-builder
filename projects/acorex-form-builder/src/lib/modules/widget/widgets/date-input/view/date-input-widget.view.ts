import { Component, OnInit, ElementRef, ChangeDetectorRef, ChangeDetectionStrategy, ViewChild, Input, EventEmitter } from '@angular/core';
import { AXFWidgetView, AXFValueWidgetView } from '../../../config/widget';
import { AXDateTime } from 'acorex-ui';

@Component({
    templateUrl: './date-input-widget.view.html',
    styleUrls: ['./date-input-widget.view.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFDateInputWidgetView extends AXFValueWidgetView {

    calendarType: any;
    displayFormat: string;

    constructor(protected cdr: ChangeDetectorRef) {
        super(cdr);
    }

    onRender(): void {
        this.cdr.markForCheck();
    }




    @Input()
    public get date(): AXDateTime {
        return this.value ? new AXDateTime(this.value, this.calendarType) : null;
    }
    public set date(v: AXDateTime) {
        this.value = v ? v.date.toJSON() : null;
    }
}
