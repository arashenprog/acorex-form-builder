import { Component, OnInit, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AXFWidgetView } from '../../../config/widget';
import { AXFValidatorProp } from '../../../../property-editor/editors/validation/validation.class';

@Component({
    templateUrl: './text-input-widget.view.html',
    styleUrls: ['./text-input-widget.view.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFTextInputWidgetView extends AXFWidgetView {


    validator: AXFValidatorProp;
    placeholder: string;




    constructor(private cdr: ChangeDetectorRef) {
        super();
    }


    onRender(): void {
        this.cdr.markForCheck();
    }
}
