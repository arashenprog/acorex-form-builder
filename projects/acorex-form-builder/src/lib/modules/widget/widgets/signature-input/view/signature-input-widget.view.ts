import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AXFWidgetView, AXFValueWidgetView } from '../../../config/widget';
import { AXFDataSourceOption } from '../../../../property-editor/editors/data-source/data-source.class';
import { AXPopupService } from 'acorex-ui';
import { SignaturePadPage } from '../signaturepad.page';
import { Observable, Observer } from 'rxjs';

@Component({
    templateUrl: './signature-input-widget.view.html',
    styleUrls: ['./signature-input-widget.view.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFSignatureInputWidgetView extends AXFValueWidgetView {

    height: number;
    width: number;
    constructor(protected cdr: ChangeDetectorRef, private popupService: AXPopupService) {
        super(cdr);
    }


    calculate(val) {
        return parseInt(val) + 2;
    }

    setSignatureClick() {
        this.popupService.open(SignaturePadPage, {
            title: 'Signature',
            size: 'md',
            data: {
                data: this.value
            }
        }).closed(c => {
            this.value = c.data;
            this.cdr.markForCheck();
        });
    }
}
