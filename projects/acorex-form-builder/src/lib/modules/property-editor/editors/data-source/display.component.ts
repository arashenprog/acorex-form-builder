import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AXBasePageComponent, AXUploadFileLoadEvent } from 'acorex-ui';
import { ClosingAction } from 'acorex-ui/lib/components/nav/popup/popup.events';
import { AXFDataSourceColumnOption } from './data-source.class';

@Component({
    templateUrl: './display.component.html',
    styleUrls: ['./display.component.scss'],
})
export class AXIDataDisplayEditorComponent extends AXBasePageComponent {

    public columns: AXFDataSourceColumnOption;
    public items: any = [];
    public displayItems: any = [];

    onClosing(e: ClosingAction) {
        e.data = {
            items: this.items,
            columns: this.columns,
            displayItems: this.displayItems
        };
        e.resolve();
    }

    onCheckValueChange(val) {        
        if (!this.displayItems) {
            this.displayItems = [];
        }

        if (!this.displayItems.includes(val)) {
            this.displayItems = [...this.displayItems, ...[val]];
        } else {
            this.displayItems = this.displayItems.filter(c => c !== val);
        } 
    }


    showItem(id)
    {
        return this.displayItems.some(s=>s==id)
    }
}