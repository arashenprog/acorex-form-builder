import { Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { AXFWidgetView } from '../../../config/widget';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { typeWithParameters } from '@angular/compiler/src/render3/util';

@Component({
    templateUrl: './signature-input-widget.view.html',
    styleUrls: ['./signature-input-widget.view.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFSignatureInputWidgetView extends AXFWidgetView {

    @ViewChild(SignaturePad, { static: true }) signaturePad: SignaturePad;

    value: string;
    height: number;
    width: number;
    info: { SignatureType: string[], StaffNumber: number, ShowType: string[], Items: any[] };
    columns: any[] = [];
    rows: any[] = [];

    signaturePadOptions: any;

    constructor() {
        super()
    }

    ngOnInit(): void {
        this.columns = this.info.Items.filter(w => w.Visible == true);
        this.rows = new Array(this.info.StaffNumber);
        this.signaturePadOptions = {
            canvasWidth: this.width,
            canvasHeight: this.height
        }
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

    getStyles() {
        let lengthCol = 100.0 / this.info.Items.filter(w => w.Visible == true).length;
        const styles = {
            'width': lengthCol + "%"
        };
        return styles;
    }

}
