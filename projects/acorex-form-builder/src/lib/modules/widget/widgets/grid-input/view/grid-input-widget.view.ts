import { Component, OnInit, ElementRef,ViewChild } from '@angular/core';
import { AXFWidgetView } from '../../../config/widget';
import { AXFDataService } from '../../../services/data.service';
import { AXFDataSourceValue } from '../../../../property-editor/editors/data-source/data-source.class';

@Component({
    templateUrl: './grid-input-widget.view.html',
    styleUrls: ['./grid-input-widget.view.scss']
})
export class AXFGridInputWidgetView extends AXFWidgetView {

    @ViewChild("el") el: ElementRef<HTMLElement>;

    value:string[];
    data:{columns:any[]}; 
    header:string;
    footer:string; 
    dsMode: string[];
    dsName: AXFDataSourceValue;
    rows:any[]=[];

    constructor(private dataService: AXFDataService) {
        super()
    }

    onRender(): void {
        if(this.el)
        this.applyStyle(this.el.nativeElement);
    }

    ngAfterViewInit() { 
        if (this.dsMode[0] == "ds" && this.dsName) {
            this.dataService.getList(this.dsName.name, this.dsName.params).then(items => {
                this.rows = items;
            });
        }
    }

    getRowData(row,field)
    {
        if (row.hasOwnProperty(field)) { 
            return row[field]; 
        }
        return "";
    }

    handleValueChange(e)
    {

    }
 
}
