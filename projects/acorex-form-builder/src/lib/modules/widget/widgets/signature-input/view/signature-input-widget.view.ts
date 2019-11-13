import { Component, OnInit, ViewChild } from '@angular/core';
import { AXFWidgetView } from '../../../config/widget';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { typeWithParameters } from '@angular/compiler/src/render3/util';

@Component({
    templateUrl: './signature-input-widget.view.html' ,
    styleUrls: ['./signature-input-widget.view.scss']
})
export class AXFSignatureInputWidgetView extends AXFWidgetView {

    @ViewChild(SignaturePad) signaturePad: SignaturePad; 
    
    value: string;
    height:number;
    width:number; 

    signaturePadOptions: any ; 
    
    constructor() {
        super()  
    }

    ngOnInit(): void {
        this.signaturePadOptions={  
            canvasWidth: this.width,
            canvasHeight: this.height
        }
    }

    drawComplete() { 
        this.value = this.signaturePad.toDataURL();
    }
 

    onClearClick() {
        this.signaturePad.clear();
        this.value = null;
    }
}
