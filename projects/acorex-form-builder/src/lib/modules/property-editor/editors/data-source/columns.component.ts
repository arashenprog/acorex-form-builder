import { Component, OnInit } from '@angular/core';
import { AXBasePageComponent } from 'acorex-ui';
import { ClosingAction } from 'acorex-ui/lib/components/nav/popup/popup.events';
import { AXFDataSourceColumnOption } from './data-source.class';

@Component({
    templateUrl: './columns.component.html',
    styleUrls: ['./columns.component.scss'],
})
export class AXFDataColumnEditorComponent extends AXBasePageComponent {

    public columns: AXFDataSourceColumnOption[];
    allowColumns:boolean=true;
    columnTypeItems: any[] = [
        { value: "string", title: "String" },
        { value: "number", title: "Number" },
        { value: "boolean", title: "Boolean" },
        { value: "date", title: "Date" },
        { value: "time", title: "Time" },
        { value: "image", title: "Image" },
        { value: "selectionList", title: "Selection List" },
        { value: "signature", title: "Signature" }
    ]
    constructor() {
        super();
    }

    onClosing(e: ClosingAction) {
        e.data = {
            columns: this.columns
        };
        e.resolve();
    }

    deleteClick(ind) {
        this.columns.splice(ind, 1);
    }

    upClick(ind, item) {
        if (ind > 0) {
            let temp = this.columns[ind - 1];
            this.columns[ind - 1] = item;
            this.columns[ind] = temp;
        }
    }

    downClick(ind, item) {
        if (ind < this.columns.length - 1) {
            let temp = this.columns[ind + 1];
            this.columns[ind + 1] = item;
            this.columns[ind] = temp;
        }
    }

    addItemClick() {
        let index = this.columns.length + 1;
        let newRow: AXFDataSourceColumnOption = {
            fieldName: "field" + index.toString(),
            title: "Field " + index.toString(),
            type: "string",
            fillByUser: false,
            isDisplay:false,
            valueField:false,
            textField:false
        };
        this.columns.push(newRow);
    }

    setValueField(e,i)
    {
        if(e!=undefined)
        {
            if(e) 
                this.columns.filter(d=>d.valueField==true).forEach(s=>s.valueField=false);  
            this.columns[i].valueField=e;
        }  
    }

    setTextField(e,i)
    {
        if(e!=undefined)
        {
            if(e) 
                this.columns.filter(d=>d.textField==true).forEach(s=>s.textField=false);  
            this.columns[i].textField=e;
        }  
    }

}
