import { Component, OnInit } from '@angular/core';
import { AXBasePageComponent } from 'acorex-ui';
import { ClosingAction } from 'acorex-ui/lib/components/nav/popup/popup.events';
import { ItemsStructureEditor } from '../items/itemstructure.editor';
import { retry } from 'rxjs/operators';

@Component({
    templateUrl: './items.component.html',
    styleUrls: ['./items.component.scss'],
})
export class AXFItemComponent extends AXBasePageComponent {

    public item: ItemsStructureEditor;
    columnTypeItems: any[] = [{ value: "string", title: "String" }, { value: "number", title: "Number" },
    { value: "boolean", title: "Boolean" }, { value: "date", title: "Date" }, { value: "time", title: "Time" },
    { value: "image", title: "Image" }, { value: "selectionList", title: "Selection List" }]

    constructor() {
        super();
    }

    onClosing(e: ClosingAction) {
        e.data = this.item.content;
        e.resolve();
    }

    itemChange(item: any, ind: number, e: any) {
        switch (item.type) {
            case "string":
            case "number":
            case "selectionList":
                this.item.content[ind][item.id] = e;
                break;
            case "date":
                this.item.content[ind][item.id] = e.date.toISOString().split('T')[0];
                break;
            case "boolean":
                this.item.content[ind][item.id] = e.target.checked;
                break;
            case "image":
                this.item.content[ind][item.id] = e.data;
                break;
            default:
                break;
        }
    }

    deleteClick(ind) {
        this.item.content.splice(ind, 1);
    }

    upClick(ind, item) {
        if (ind > 0) {
            let temp = this.item.content[ind - 1];
            this.item.content[ind - 1] = item;
            this.item.content[ind] = temp;
        }
    }

    downClick(ind, item) {
        if (ind < this.item.content.length - 1) {
            let temp = this.item.content[ind + 1];
            this.item.content[ind + 1] = item;
            this.item.content[ind] = temp;
        }
    }

    addItemClick() {
        if (!this.item.content)
            this.item.content = [];
        let param: any = { id: new Date().getTime() };
        this.item.types.forEach((e) => {
            param[e.id] = e.defaultValue;
        });
        this.item.content.push(param);
    }

    GetDate(val)
    {debugger
        if(!val || val==null)
        return "";

        return new Date(val);
    }

}