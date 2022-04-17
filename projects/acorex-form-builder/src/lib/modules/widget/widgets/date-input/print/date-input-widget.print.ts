import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AXFWidgetPrint } from '../../../config/widget';
import { AXDateTime } from 'acorex-ui';

@Component({
    templateUrl: './date-input-widget.print.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFDateInputWidgetPrint extends AXFWidgetPrint {


    textStyle: string[];
    displayFormat: string;
    setCurrent: boolean = false;

    constructor(protected cdr: ChangeDetectorRef) {
        super();
    }

    ngAfterViewInit() {
        super.ngAfterViewInit();
        if (this.value == undefined && this['rIndex'] >= 0 && this['dataContext'] != undefined &&
            this['dataContext'].hasOwnProperty(this['name'])) {
            this.value =new AXDateTime((this['dataContext'][this['name']]).toString()); 
        } 
        if(!this.value && this.setCurrent)
            this.value=new Date();
        this.cdr.detectChanges();
    }
    
}
