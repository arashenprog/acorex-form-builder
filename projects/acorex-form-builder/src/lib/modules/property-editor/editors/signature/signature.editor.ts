import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AXFProperyEditor } from '../../config/editor';
import { SignatureStructureEditor } from './signaturestructure.editor';
import { isNumber } from 'util';
import { AXFDataService } from '../../../widget/services/data.service';

@Component({
    templateUrl: './signature.editor.html',
    styleUrls: ['./signature.editor.scss'],
})
export class AXFSignatureEditorComponent extends AXFProperyEditor<SignatureStructureEditor> implements OnInit {

    typeItems: any[] = [{ value: "supervisor", title: "Supervisor" }, { value: "staff", title: "Staff" }]
    showItems: any[] = [{ value: "item", title: "Item" }, { value: "grid", title: "Grid" }]


    constructor(protected cdr: ChangeDetectorRef, private dataService: AXFDataService) {
        super(cdr);
    }

    ngOnInit(): void {
    }

    ngAfterViewInit() {
        this.initiated = true;
    }



    signatureTypeChange(e) {
        if (this.value.SignatureType != e) {
            this.value.SignatureType = e;
            if (this.value.SignatureType == 'supervisor') {
                this.value.StaffNumber = 1;
                this.value.ShowType = ["item"];
            }
            super.handleValueChange(this.value);
        }
    }

    showTypeChange(e) {
        if (e.length > 0 && this.value.SignatureType != e) {
            this.value.ShowType = e;
            super.handleValueChange(this.value);
        }
    }


    staffNumberChange(e) {
        if (parseInt(e) != NaN)
            this.value.StaffNumber = parseInt(e.toString());
        super.handleValueChange(this.value);
    }


    textItemChange(ind, e) {
        this.value.Items[ind].Text = e;
        super.handleValueChange(this.value);
    }

    deleteClick(val) {
        let ind = this.value.Items.findIndex(w => w.Value == val);
        this.value.Items.splice(ind, 1);
        super.handleValueChange(this.value);
    }

    hiddenClick(val) {
        let ind = this.value.Items.findIndex(w => w.Value == val);
        this.value.Items[ind].Visible = !this.value.Items[ind].Visible;
        super.handleValueChange(this.value);
    }

    upClick(ind, item) {
        if (ind > 0) {
            let temp = this.value.Items[ind - 1];
            this.value.Items[ind - 1] = item;
            this.value.Items[ind] = temp;
            super.handleValueChange(this.value);
        }
    }

    downClick(ind, item) {
        if (ind < this.value.Items.length - 1) {
            let temp = this.value.Items[ind + 1];
            this.value.Items[ind + 1] = item;
            this.value.Items[ind] = temp;
            super.handleValueChange(this.value);
        }
    }

    addItemClick() {
        let index = this.value.Items.length + 1;
        this.value.Items.push({ Value: index, Text: "Item" + index.toString(), Visible: true, Type: "String" });
        super.handleValueChange(this.value);
    }

}
