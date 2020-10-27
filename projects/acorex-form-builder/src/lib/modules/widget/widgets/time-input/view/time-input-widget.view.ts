import { Component, OnInit, ElementRef, ChangeDetectorRef, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { AXFValueWidgetView } from '../../../config/widget';
import { AXDateTime } from 'acorex-ui';

@Component({
    templateUrl: './time-input-widget.view.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFTimeInputWidgetView extends AXFValueWidgetView {

    timeMask = (rawValue) => {
        let num2 = /[0-9]/;
        if (rawValue && rawValue[0] === '2') {
            num2 = /[0-3]/;
        }
        return [/[0-2]/, num2, ':', /[0-5]/, /[0-9]/];
    }

    setCurrent: boolean = false;

    constructor(private el: ElementRef<HTMLElement>, protected cdr: ChangeDetectorRef) {
        super(cdr);
    }

    handleSetCurrent() {
        this.value = new AXDateTime().format('HH:mm');
    }


    ngAfterViewInit() {
        super.ngAfterViewInit();
        if (!this.value && this.setCurrent) {
            this.value = new AXDateTime().format('HH:mm');
        }
    }
}
