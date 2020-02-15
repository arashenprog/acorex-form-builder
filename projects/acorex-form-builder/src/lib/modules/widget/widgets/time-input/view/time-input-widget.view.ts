import { Component, OnInit, ElementRef, ChangeDetectorRef, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { AXFWidgetView, AXFValueWidgetView } from '../../../config/widget';
import { AXPopoverComponent } from 'acorex-ui';

@Component({
    templateUrl: './time-input-widget.view.html',
    // styleUrls: ['./time-input-widget.view.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFTimeInputWidgetView extends AXFValueWidgetView {
    @ViewChild('el1', { static: true }) el1: ElementRef<HTMLElement>;
    @ViewChild('popSelectBox') popSelectBox: AXPopoverComponent;

    hours: any[] = [];
    minutes: any[] = [];

    constructor(private el: ElementRef<HTMLElement>, protected cdr: ChangeDetectorRef) {
        super(cdr);
        this.hours = Array.apply(null, new Array(24)).map(function (e, ind) { return { value: ind.toString().length < 2 ? '0' + ind.toString() : ind.toString() }; });
        this.minutes = Array.apply(null, new Array(60)).map(function (e, ind) { return { value: ind.toString().length < 2 ? '0' + ind.toString() : ind.toString() }; });
    }
    fitParent = true;
    selectedHour: any[] = [];
    selectedMinute: any[] = [];
    _uid: string = 'tim' + Math.floor(Math.random() * 1000).toString();



    onRender(): void {
        if (!this.value) {
            this.value = '00:00'
        }
        this.selectedHour = [{ value: this.value.toString().split(':')[0] }];
        this.selectedMinute = [{ value: this.value.toString().split(':')[1] }];
    }

    handleShowEditor() {
        this.popSelectBox.open();
    }

    dataChange(e) {

    }

    hourChange(e) {
        if (e.length > 0) {
            this.value = e[0].value + this.value.substring(this.value.indexOf(':'));
        }
    }

    minuteChange(e) {
        if (e.length > 0) {
            this.value = this.value.substring(0, this.value.indexOf(':') + 1) + e[0].value;
        }
    }
}
