import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AXFWidgetView } from '../../../config/widget';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { AXFDataSourceOption } from '../../../../property-editor/editors/data-source/data-source.class';

@Component({
    templateUrl: './signature-input-widget.view.html',
    styleUrls: ['./signature-input-widget.view.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFSignatureInputWidgetView extends AXFWidgetView {

    @ViewChild(SignaturePad, { static: true }) signaturePad: SignaturePad;
    dataSource: AXFDataSourceOption;
    value: string;
    signaturePadOptions: any;
    status:string;
    constructor(protected cdr: ChangeDetectorRef) {
        super()
    }

    ngOnInit(): void {
        this.signaturePadOptions = {
             canvasHeight: 70
        }
    } 

    addSignatureClick() {
        if (!this.dataSource.dataItems)
        this.dataSource.dataItems = [];
        let param: any = {
            date: new Date().getTime(),
            name: "Item 1",
            signature: ""
        }
        this.dataSource.dataItems.push(param);
        this.cdr.markForCheck();
    }

    drawComplete(ind) {
        //this.info.Items[ind].Value = this.signaturePad.toDataURL();
    }


    onClearClick(ind) {
        let dfssf = document.querySelectorAll("signature-pad");
        ///dfssf[ind].clear();
        //this.signaturePad.clear();
        //this.info.Items[ind].Value = null;
    }

}
