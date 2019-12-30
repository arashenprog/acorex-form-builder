import { Component, OnInit } from '@angular/core';
import { AXBasePageComponent, AXUploadFileLoadEvent } from 'acorex-ui';
import { ClosingAction } from 'acorex-ui/lib/components/nav/popup/popup.events';
import { AXFDataSourceColumnOption } from './data-source.class';

@Component({
    templateUrl: './items.component.html',
    styleUrls: ['./items.component.scss'],
})
export class AXIDataItemEditorComponent extends AXBasePageComponent {

    public columns: AXFDataSourceColumnOption;
    public items: any = [];

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
        let param: any = { id: new Date().getTime() };
        this.items.push(param);
    }
}