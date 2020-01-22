import { Component, OnInit, ElementRef, HostBinding, ChangeDetectorRef, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { AXFWidgetView } from '../../../config/widget'; 
import { AXFDataSourceOption } from '../../../../property-editor/editors/data-source/data-source.class';
import { WidgetConfig } from '../../../services/widget.service';
import { JsonPipe } from '@angular/common';

@Component({ 
    selector: "[axf-repeater]",
    templateUrl: './repeater-widget.view.html',
    styleUrls: ['./repeater-widget.view.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFRepeaterWidgetView extends AXFWidgetView {
  
    dataSource: AXFDataSourceOption; 
    //items:any[]=[];
    @ViewChild("table", { static: true }) table: ElementRef<HTMLTableElement>;
    constructor(
        private cdr: ChangeDetectorRef) {
        super();
    }

    onRender() {
        this.applyStyle(this.table.nativeElement);
        this.cdr.markForCheck();
    }

    getHeader() {
        return this.widgets.filter(c => c.options.isHeader == true);
    }

    getBody() {
        let row=this.widgets.find(c => c.options.isHeader == false);
     
        let items= Array.apply(null,new Array(this.dataSource.dataItems.length)).map(function(){return row}); 
        items.forEach((f,index)=>{  
            f=this.setDataRepeater(f,this.dataSource.dataItems[index])
        })
        return items;
    }

    setDataRepeater(row:WidgetConfig ,f: any)
    { 
        if(row.options.text &&  row.options.text.includes("["))
        {
            let list = row.options.text.match(/\[\S+\]/g);
            list.forEach(w => {
                row.options.text=f[w.substring(1, w.length - 1)];
            });
        }
        if(row.options.widgets)
            this.setDataRepeater(row.options.widgets[0],f);
         return row;
    }


    ngOnInit()
    {  
    }

    // addItemClick()
    // {
    //     this.items.push({});
    //     this.cdr.markForCheck();
    // }
}
