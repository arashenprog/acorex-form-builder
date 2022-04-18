import { Component, OnInit, ChangeDetectionStrategy, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { AXFWidgetPrint } from '../../../config/widget';
import { AXFDataSourceOption } from '../../../../property-editor/editors/data-source/data-source.class';
import { AXFDataService } from '../../../services/data.service';

@Component({
    templateUrl: './list-input-widget.print.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFListInputWidgetPrint extends AXFWidgetPrint {
    @ViewChild("el") el: ElementRef<HTMLElement>;

    dataSource: AXFDataSourceOption;
    mode: string;
    direction: string;
    alignCheck: string;
    alignCheckNew: string;
    viewType: string;
    visible: boolean = true;
    printMode: string;
    columns: number;
    alignment: string;
    color: string;
    bgColor: string;
    fontSize: string;

    constructor(private cdr: ChangeDetectorRef) {
        super()
    }

    onRender(): void {
        if (this.el)
            this.applyStyle(this.el.nativeElement);
    }

    ngAfterViewInit() {
        super.ngAfterViewInit();
        this.refresh();
        if (this.value == undefined && this.dataSource.mode === 'manual') { 
            let defaultVals= this.dataSource.dataItems.filter(s=>s.DefaultValue==true).map((s)=>{return s.value});
            if(defaultVals.length>0)
            {
                this.value =defaultVals;
            } 
         }
         if(this.value && !Array.isArray(this.value))
         {
            this.value =[this.value.toString()];
         }
        //  debugger;
        // this.invokeEvent('onValueChange');
        this.cdr.detectChanges();
    }

    refresh() {
        if (this.dataSource.mode == "remote") {
            this.dataService.getList(
                this.dataSource.dataSource.name,
                this.dataSource.dataSource.params
            ).then(c => {
                this.dataSource.dataItems = c;
                this.cdr.detectChanges();
            })
        }
    }

    getNumberSize() {
        switch (this.fontSize) {
            case 'xx-small':
                return 11;
            case 'x-small':
                return 13;
            case 'smaller':
            case 'inherit':
                return 15;
            case 'small':
                return 20;
            case 'medium':
                return 25;
            case 'large':
                return 30;
            case 'larger':
                return 35;
            case 'x-large':
            case 'xx-large':
                return 40;
        }
    }

    getSize() {
       return this.getNumberSize() + 'px';
    }

    getMargin()
    {
        switch (this.fontSize) { 
            case 'xx-small':
                return 15+'px';
            case 'x-small':
                return 18+'px';
            case 'smaller':
            case 'inherit':
                return 20+'px';
            case 'small':
                return 25+'px';
            case 'medium':
                return 30+'px';
            case 'large':
                return 35+'px';
            case 'larger':
                return 40+'px';
            case 'x-large':
            case 'xx-large':
                return 45+'px';
        }
    }

    

}
