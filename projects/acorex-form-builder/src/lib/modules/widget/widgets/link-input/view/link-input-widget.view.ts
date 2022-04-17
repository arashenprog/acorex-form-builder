import { Component, OnInit, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AXFWidgetView, AXFValueWidgetView } from '../../../config/widget';
import { AXFValidatorProp } from '../../../../property-editor/editors/validation/validation.class'; 
import { AXPopupService } from 'acorex-ui';

@Component({
    templateUrl: './link-input-widget.view.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFLinkInputWidgetView extends AXFValueWidgetView {

    
    placeholder: string; 
    defaultValue: number;
    allowExtend:boolean;
    constructor(protected cdr: ChangeDetectorRef,private popupService: AXPopupService) {
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
  
    direct()
    { 
        window.open(this.value,"_blank");
    }
}
