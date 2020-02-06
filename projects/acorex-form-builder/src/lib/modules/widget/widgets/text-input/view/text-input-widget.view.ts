import { Component, OnInit, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AXFWidgetView, AXFValidatableWidget } from '../../../config/widget';
import { IValidationRuleResult } from 'acorex-ui';

@Component({
    templateUrl: './text-input-widget.view.html',
    styleUrls: ['./text-input-widget.view.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFTextInputWidgetView extends AXFWidgetView {
    

    placeholder: String;

    // validate(): Promise<IValidationRuleResult> {
        
    // }


    constructor(private cdr: ChangeDetectorRef) {
        super()
    }


    onRender(): void {
        this.cdr.markForCheck();
    }

  
}
