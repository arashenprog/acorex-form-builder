import { Component, OnInit, ViewEncapsulation, ElementRef, Renderer2, Input, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AXFWidgetDesigner } from '../../../config/widget';


@Component({
    selector: "[axf-widget-text]",
    templateUrl: './grid-input-widget.designer.html',
    styleUrls: ['./grid-input-widget.designer.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class AXFGridInputWidgetDesigner extends AXFWidgetDesigner {

    @ViewChild("el") el: ElementRef<HTMLElement>;

    value:string[];
    data:{columns:any[]}; 
    header:string;
    footer:string; 
    dsMode: string[];
    items:{content:any[]}

    constructor(private cdr:ChangeDetectorRef) {
        super()
    }

    onRender(): void { 
        if(this.el)
        this.applyStyle(this.el.nativeElement);
        this.cdr.markForCheck();
    }

    handleValueChange(e)
    {

    }
 
    getRowData(row,item)
    {
        if (row.hasOwnProperty(item.id)) { 
            return row[item.id]; 
        }
        return item.defaultValue;
    }
}




