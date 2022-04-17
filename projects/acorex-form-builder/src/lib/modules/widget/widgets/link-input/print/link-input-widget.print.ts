import { Component, OnInit, ChangeDetectionStrategy, ElementRef, ChangeDetectorRef } from '@angular/core';
import { AXFWidgetPrint } from '../../../config/widget';

@Component({
    templateUrl: './link-input-widget.print.html',
})
export class AXFLinkInputWidgetPrint extends AXFWidgetPrint {

    placeholder: string;
    textStyle: string[];
    textAlign:string;
    color:string;
    defaultValue:string;
    constructor(private cdr: ChangeDetectorRef) {
        super();
    }

    ngAfterViewInit() {
        super.ngAfterViewInit();
        if (this.value === undefined && this.defaultValue !== undefined) {
            this.value = this.defaultValue;
        }
        if (this.value == undefined && this['rIndex'] >= 0 && this['dataContext'] != undefined &&
            this['dataContext'].hasOwnProperty(this['name'])) {
            this.value = this['dataContext'][this['name']];
        }
        this.cdr.detectChanges();
    }

}
