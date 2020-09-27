import { Component, OnInit, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AXFValueWidgetView } from '../../../config/widget';

@Component({
    templateUrl: './number-input-widget.view.html',
    //styleUrls: ['./number-input-widget.view.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFNumberInputWidgetView extends AXFValueWidgetView {


    internalValue: string;
    placeholder: string;

    constructor(protected cdr: ChangeDetectorRef, private hostElement: ElementRef<HTMLTableCellElement>) {
        super(cdr);
        // this.valueChange.subscribe(c => {
        //     this.internalValue = this.value;
        //     this.setValue()
        //     //this.cdr.detectChanges();
        // });
    }


    onRender(): void {
        if (this.value == undefined && this['rIndex'] >= 0 && this['dataContext'] != undefined &&
            this['dataContext'].hasOwnProperty(this['name'])) {
            this.internalValue = this.value = this['dataContext'][this['name']];
        }
        this.cdr.markForCheck();
    }


    onTextChanged(e) {
        //this.value = Number(e);
    }

}
