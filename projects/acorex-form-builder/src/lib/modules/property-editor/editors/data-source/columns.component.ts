import { Component, OnInit } from '@angular/core';
import { AXBasePageComponent } from 'acorex-ui';
import { ClosingAction } from 'acorex-ui/lib/components/nav/popup/popup.events';
import { AXFDataSourceColumnValue } from './data-source.class';

@Component({
    templateUrl: './columns.component.html',
    styleUrls: ['./columns.component.scss'],
})
export class AXFDataColumnEditorComponent extends AXBasePageComponent {

    public columns: AXFDataSourceColumnValue[];
    columnTypeItems: any[] = [
        { value: "string", title: "String" },
        { value: "number", title: "Number" },
        { value: "boolean", title: "Boolean" },
        { value: "date", title: "Date" },
        { value: "time", title: "Time" },
        { value: "image", title: "Image" },
        { value: "selectionList", title: "Selection List" }
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


    columnTypeChange(ind, e) {
        // if (!e || !e.length)
        //     return;
        // if (this.columns[ind].type != e) {
        //     this.columns[ind].mode = false;
        //     this.columns[ind].subText = "";
        // }
        // this.columns[ind].type = e;
        // this.columns[ind].defaultValue = this.setDefaultValue(this.columns[ind].type);
    }

    modeChange(ind, e) {
        //this.columns[ind].mode = e.target.checked;
    }
    subTextChange(ind, e) {
        // this.columns[ind].subText = e;
        // this.columns[ind].subItems = e == "" ? [] : e.split(',').map((m) => { return { value: m } }).filter(f => f.value != "");
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
        let newRow: AXFDataSourceColumnValue = {
            fieldName: "field" + index.toString(),
            title: "Field " + index.toString(),
            type: "string",
            fillByUser: false
        };
        this.columns.push(newRow);
    }

   

    setDefaultValue(type: string) {
        switch (type) {
            case "string":
                return "Item";
            case "number":
                return 1;
            case "date":
                return new Date().toISOString().split('T')[0];
            case "selectionList":
                return "";
            case "boolean":
                return "false";
            case "image":
                return './assets/images/noimage.png';
            case "time":
                return new Date().toLocaleTimeString();
        }
    }

}
