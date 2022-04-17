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
    setCurrent: boolean = false;


    constructor(protected cdr: ChangeDetectorRef) {
        super(cdr);
    }

    onRender(): void {
        if (this.value == undefined && this['rIndex'] >= 0 && this['dataContext'] != undefined &&
            this['dataContext'].hasOwnProperty(this['name'])) {
            this.value =new AXDateTime((this['dataContext'][this['name']]).toString());
            this.cdr.detectChanges(); 
        } 
    }


    ngAfterViewInit() {
        super.ngAfterViewInit();
        if (!this.value && this.setCurrent) {
            this.value = new Date();
        }
    }

    @Input()
    public get date(): AXDateTime {
        return this.value ? new AXDateTime(this.value, this.calendarType) : null;
    }
    public set date(v: AXDateTime) {
        this.value = v ? v.date.toJSON() : null;
    }

    dateChanged() {
        this.cdr.markForCheck();
    }

}
