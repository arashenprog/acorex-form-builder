import { Component, OnInit, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AXFWidgetView, AXFValueWidgetView } from '../../../config/widget';
import { AXFValidatorProp } from '../../../../property-editor/editors/validation/validation.class';

@Component({
    templateUrl: './text-input-widget.view.html',
    styleUrls: ['./text-input-widget.view.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFTextInputWidgetView extends AXFValueWidgetView {


    validator: AXFValidatorProp;
    placeholder: string;

    constructor(protected cdr: ChangeDetectorRef) {
        super(cdr);
    }


    onRender(): void {
        this.cdr.markForCheck();
    }
}
