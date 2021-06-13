import { Component, OnInit, ChangeDetectionStrategy, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { AXFWidgetPrint } from '../../../config/widget';
import { AXFDataSourceOption } from '../../../../property-editor/editors/data-source/data-source.class';
import { AXFDataService } from '../../../services/data.service';

@Component({
    templateUrl: './listsecond-input-widget.print.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFListSecondInputWidgetPrint extends AXFWidgetPrint {
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

    hasItem(item)
    {
        if ((this.mode=='multiple' && this.value && this.value.map(d=>d[this.dataSource.columns[0].fieldName]).indexOf(item[this.dataSource.columns[0].fieldName])>-1) ||
        (this.mode=='single' && this.value && this.value[this.dataSource.columns[0].fieldName]==item[this.dataSource.columns[0].fieldName]))
        return true; 
        else
        return false;
    }

    onRender(): void {
        if (this.el)
            this.applyStyle(this.el.nativeElement); 
    }

    ngAfterViewInit() {
        super.ngAfterViewInit();
        this.refresh();
        if (this.value == undefined && this.dataSource.mode === 'manual') { 
            let defaultVals= this.dataSource.dataItems.filter(s=>s.DefaultValue==true);
            if(defaultVals.length>0)
            {
                if(this.mode=='multiple')
                    this.value =defaultVals;
                else 
                    this.value =defaultVals[0]; 
            }  
        }
        this.cdr.detectChanges();
    }

    refresh() {
        if (this.dataSource.mode == "remote") {
            this.dataService.getList(
                this.dataSource.dataSource.name,
                this.dataSource.dataSource.params
            ).then(c => {
                this.dataSource.dataItems = c; 
                let val=this.value;
                this.cdr.detectChanges();
            })
        }
    }

    getNumberSize() {
        switch (this.fontSize) {
            case 'xx-small':
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

    

    

}
