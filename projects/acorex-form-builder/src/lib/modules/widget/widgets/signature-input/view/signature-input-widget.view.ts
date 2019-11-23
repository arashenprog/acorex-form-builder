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
     
    height:number;
    width:number; 
    info:{SignatureType:string[],StaffNumber:number,ShowType:string[],Items:any[]}; 
    columns:any[]=[];
    rows:any[]=[];

    signaturePadOptions: any ; 
    
    constructor() {
        super()  
    }

    ngOnInit(): void {
        this.columns=this.info.Items.filter(w=>w.Visible==true); 
        this.rows=new Array(this.info.StaffNumber); 
        this.signaturePadOptions={  
            canvasWidth: this.width,
            canvasHeight: this.height
        }
    }

    drawComplete(ind) { 
       //this.info.Items[ind].Value = this.signaturePad.toDataURL();
    }
 

    onClearClick(ind) {
        let dfssf= document.querySelectorAll("signature-pad");
        
       ///dfssf[ind].clear();
       //this.signaturePad.clear();
        //this.info.Items[ind].Value = null;
    }

    getStyles() {  
        let lengthCol= 12 / this.info.Items.filter(w=>w.Visible==true).length;
        return 'col-md-'+Math.round(lengthCol);
    }

}
