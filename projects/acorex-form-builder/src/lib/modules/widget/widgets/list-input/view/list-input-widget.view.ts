import { Component, OnInit, ElementRef,ViewChild } from '@angular/core';
import { AXFWidgetView } from '../../../config/widget';
import { ContentItemsStructureEditor } from '../../../../property-editor/editors/items/itemstructure.editor';
import { AXFDataService } from '../../../services/data.service';

@Component({
    templateUrl: './list-input-widget.view.html',
    styleUrls: ['./list-input-widget.view.scss']
})
export class AXFListInputWidgetView extends AXFWidgetView {

    @ViewChild("el") el: ElementRef<HTMLElement>;

    items:{content:any[],types:ContentItemsStructureEditor[]};
    mode:string;
    direction:string;
    alignCheck:string; 
    showOther:boolean;
    viewType:boolean;
    dsMode:string[];
    dsName:string;


    constructor(private dataService: AXFDataService) {
        super()
    }

    onRender(): void {
        if(this.el)
        this.applyStyle(this.el.nativeElement);
    }

    ngAfterViewInit() {
     
        if(this.dsMode[0]=="ds" && this.dsName!="")
        {
            this.dataService.getList(this.dsName).then(items => {
                this.items.content = items; 
            });
        }  
    }

    handleValueChange(e)
    {

    }

    getStyles(mode) { 
        const styles = { 
            'border-radius': mode == 'single' ? 100+"%" : 0 
        };
        return styles;
    }
}
