import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AXBasePageComponent, AXUploadFileLoadEvent } from 'acorex-ui';
import { ClosingAction } from 'acorex-ui/lib/components/nav/popup/popup.events';
import { AXFDataSourceColumnOption } from './data-source.class';

@Component({
    templateUrl: './items.component.html',
    styleUrls: ['./items.component.scss'],
})
export class AXIDataItemEditorComponent extends AXBasePageComponent {

    //@ViewChild(SignaturePad, { static: true }) signaturePad: SignaturePad;
    public columns: AXFDataSourceColumnOption;
    public items: any = [];
    signaturePadOptions: any;

    constructor() {
        super();
    }

    ngOnInit()
    {
        this.signaturePadOptions = {
            canvasWidth: 150,
            canvasHeight:100
        }
    }

    onClosing(e: ClosingAction) {
        e.data = {
            items: this.items,
            columns: this.columns
        };
        e.resolve();
    }


    handleUpload(item: any, col: AXFDataSourceColumnOption, file: AXUploadFileLoadEvent) {
        item[col.fieldName] = file.data;
    }


    deleteClick(ind) {
        this.items.splice(ind, 1);
    }

    upClick(ind, item) {
        if (ind > 0) {
            let temp = this.items[ind - 1];
            this.items[ind - 1] = item;
            this.items[ind] = temp;
        }
    }

    downClick(ind, item) {
        if (ind < this.items.length - 1) {
            let temp = this.items[ind + 1];
            this.items[ind + 1] = item;
            this.items[ind] = temp;
        }
    }

    addItemClick() {
        if (!this.items)
            this.items = [];
        let param: any = { id: new Date().getTime(),DefaultValue:true };
        this.items.push(param);
    }

    drawComplete(ind) {
        //this.items[ind].Value = this.signaturePad.toDataURL();
    }


    onClearClick(ind) {  
        // var canvas =document.querySelector("#signature"+ind+"  canvas");  
        // var fdf= new ElementRef(canvas);
        // var sig = new SignaturePad(fdf);
        // sig.clear();
        // this.items[ind].Value = null;
    }
}