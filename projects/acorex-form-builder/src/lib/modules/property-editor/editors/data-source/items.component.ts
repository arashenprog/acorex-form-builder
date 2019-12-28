import { Component, OnInit } from '@angular/core';
import { AXBasePageComponent } from 'acorex-ui';
import { ClosingAction } from 'acorex-ui/lib/components/nav/popup/popup.events';
import { AXFDataSourceColumnValue } from './data-source.class';

@Component({
    templateUrl: './items.component.html',
    styleUrls: ['./items.component.scss'],
})
export class AXFItemComponent extends AXBasePageComponent {

    public columns: AXFDataSourceColumnValue;
    public items: any = [];
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
            items: this.items,
            columns: this.columns
        };
        e.resolve();
    }

    itemChange(item: any,fieldName:string,value:any) {
        this.items[fieldName] = value;
        // switch (item.type) {
        //     case "string":
        //     case "number":
        //     case "selectionList":
        //         this.items[ind][item.] = e;
        //         break;
        //     case "date":
        //         this.items[ind][item.id] = e.date.toISOString().split('T')[0];
        //         break;
        //     case "boolean":
        //         this.items[ind][item.id] = e.target.checked;
        //         break;
        //     case "image":
        //         this.items[ind][item.id] = e.data;
        //         break;
        //     default:
        //         break;
        // }
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
        let param: any = { id: new Date().getTime() };
        // this.columns.types.forEach((e) => {
        //     param[e.id] = e.defaultValue;
        // });
        this.items.push(param);
    }



}