import { Component, OnInit, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { strictEqual } from 'assert';
import { AXFValueWidgetView } from '../../../config/widget';

@Component({
    templateUrl: './number-input-widget.view.html',
    //styleUrls: ['./number-input-widget.view.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFNumberInputWidgetView extends AXFValueWidgetView {

    defaultValue: number;
    placeholder: string;
    decimalNumber:number;

    constructor(protected cdr: ChangeDetectorRef, private hostElement: ElementRef<HTMLTableCellElement>) {
        super(cdr); 
        this.valueChange.subscribe(() => { 
            if(this.decimalNumber && Number(this.decimalNumber)>0 && this.value && this.value.toString().length-this.value.toString().indexOf('.')!=Number(this.decimalNumber)+1) 
            { 
                let basePow=Math.pow(10,Number(this.decimalNumber));
                this.value= Number((Math.ceil(this.value * basePow) / basePow).toFixed(Number(this.decimalNumber)));  
                this.cdr.markForCheck();
                this.cdr.detectChanges();
            } 
        });
    } 

    onRender(): void {
        if (this.value === undefined && this['rIndex'] >= 0 && this['dataContext'] !== undefined &&
            this['dataContext'].hasOwnProperty(this['name'])) {
            this.value = this['dataContext'][this['name']];
        }
        this.cdr.markForCheck();
    }


    ngAfterViewInit() {
        super.ngAfterViewInit();
        if (this.value === undefined && this.defaultValue !== undefined) {
            this.value = this.defaultValue;
        }
    }

}
