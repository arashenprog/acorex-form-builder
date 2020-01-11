import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AXFWidgetView } from '../../../config/widget';  
import { AXFDataSourceOption } from '../../../../property-editor/editors/data-source/data-source.class';

@Component({
    templateUrl: './signature-input-widget.view.html',
    styleUrls: ['./signature-input-widget.view.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFSignatureInputWidgetView extends AXFWidgetView {
 
    dataSource: AXFDataSourceOption;
    value: string; 
    status:string;
    constructor(protected cdr: ChangeDetectorRef) {
        super()
    }

    ngOnInit(): void { 
    } 

    addSignatureClick() {
        if (!this.dataSource.dataItems)
        this.dataSource.dataItems = [];
        let param: any = {
            date: new Date().getTime(),
            name: "Item 1",
            signature: ""
        }
        this.dataSource.dataItems.push(param);
        this.cdr.markForCheck();
    }


    signChange(e)
    {  
        this.dataSource.dataItems[0]["signature"]=e;
    }
}
