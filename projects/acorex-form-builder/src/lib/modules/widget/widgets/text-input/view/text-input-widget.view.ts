import { Component, OnInit, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AXFWidgetView, AXFValueWidgetView } from '../../../config/widget';
import { AXFValidatorProp } from '../../../../property-editor/editors/validation/validation.class';

@Component({
    templateUrl: './text-input-widget.view.html',
    styleUrls: ['./text-input-widget.view.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFTextInputWidgetView extends AXFValueWidgetView {

    
    placeholder: string; 
    defaultValue: number;
    constructor(protected cdr: ChangeDetectorRef) {
        super(cdr);
    }


    onRender(): void {
        if (this.value == undefined && this['rIndex'] >= 0 && this['dataContext'] != undefined &&
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

    setDateTime()
    {
        this.value=new Date().toLocaleDateString('en-GB')+' ' +new Date().toLocaleTimeString('en-GB').substr(0,5); 
        this.cdr.markForCheck();
    }

    setTime()
    {
        this.value = new Date().toLocaleTimeString('en-GB').substr(0,5); 
        this.cdr.markForCheck();
    }
}
