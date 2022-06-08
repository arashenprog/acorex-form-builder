import { elementEventFullName } from '@angular/compiler/src/view_compiler/view_compiler';
import { Component, OnInit, ChangeDetectionStrategy, ElementRef, ChangeDetectorRef } from '@angular/core';
import { AXFWidgetPrint } from '../../../config/widget';

@Component({
    templateUrl: './number-input-widget.print.html',
})
export class AXFNumberInputWidgetPrint extends AXFWidgetPrint {

    placeholder: string;
    textStyle: string[];
    textAlign:string;
    decimalNumber:number;
    constructor(private cdr: ChangeDetectorRef) {
        super();
    }

    ngAfterViewInit() {
        super.ngAfterViewInit();
        if (this.value == undefined && this['rIndex'] >= 0 && this['dataContext'] != undefined &&
            this['dataContext'].hasOwnProperty(this['name'])) {
            this.value = this['dataContext'][this['name']];
        }
        if(this.decimalNumber && Number(this.decimalNumber)>0 && this.value!=undefined)
        {
            if (this.value.toString().indexOf('.')==-1)
            {
                this.value+='.'+'0'.repeat(Number(this.decimalNumber));
            }
            else if( this.value.toString().length-this.value.toString().indexOf('.')!=Number(this.decimalNumber)+1)
            {
                let basePow=Math.pow(10,Number(this.decimalNumber));
            this.value= parseFloat((Math.ceil(this.value * basePow) / basePow).toFixed(Number(this.decimalNumber))); 
            }
        }


        // if(this.decimalNumber && Number(this.decimalNumber)>0 && this.value && 
        // (( this.value.toString().length-this.value.toString().indexOf('.')!=Number(this.decimalNumber)+1) || this.value.toString().indexOf('.')!=-1)) 
        // { 
        //     let basePow=Math.pow(10,Number(this.decimalNumber));
        //     this.value= parseFloat((Math.ceil(this.value * basePow) / basePow).toFixed(Number(this.decimalNumber)));  
        // } 
        this.cdr.detectChanges();
        this.cdr.markForCheck();
    }

}
