import { Component, OnInit, ChangeDetectionStrategy, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { AXFWidgetPrint } from '../../../config/widget';
import { AXFDataSourceOption } from '../../../../property-editor/editors/data-source/data-source.class';
import { AXFDataService } from '../../../services/data.service';

@Component({
    templateUrl: './list-input-widget.print.html',
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class AXFListInputWidgetPrint extends AXFWidgetPrint {
    @ViewChild("el") el: ElementRef<HTMLElement>;

    dataSource: AXFDataSourceOption;
    mode: string;
    direction: string;
    alignCheck: string;
    viewType: string;
    visible: boolean = true;
    printMode:string;
    columns:number;
    constructor(private cdr: ChangeDetectorRef) {
        super()
    }

    onRender(): void {
        if (this.el)
            this.applyStyle(this.el.nativeElement);
        if (this.value==undefined && this.value==null && this.dataSource.mode =='manual')
        {
            this.value=[]; 
            {
                this.value.push(this.dataSource.dataItems[0][this.dataSource.columns[0].fieldName]);
                this.cdr.markForCheck();
            }
        }    
    }

    ngAfterViewInit() {
        this.refresh();
    }

    refresh() {
        
        if (this.dataSource.mode == "remote") {
            this.dataService.getList(
                this.dataSource.dataSource.name,
                this.dataSource.dataSource.params
            ).then(c => {
                this.dataSource.dataItems = c;
                if (this.value==undefined && this.value==null)
                {
                    this.value=[]; 
                    {
                        this.value.push(this.dataSource.dataItems[0][this.dataSource.columns[0].fieldName]);
                        this.cdr.markForCheck();
                    }
                }  
                this.cdr.markForCheck();
            })
        }
    }

    getStyles(mode) { 
        const styles = {
            'border-radius': mode=='single' ? 100 + "%" : 0
        };
        return styles;
    }
}
