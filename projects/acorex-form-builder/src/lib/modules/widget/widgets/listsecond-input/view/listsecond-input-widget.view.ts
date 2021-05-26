import { Component, OnInit, ElementRef, ViewChild, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AXFWidgetView, AXFValueWidgetView } from '../../../config/widget';
import { AXFDataSourceOption } from '../../../../property-editor/editors/data-source/data-source.class';

@Component({
    templateUrl: './listsecond-input-widget.view.html',
    styleUrls: ['./listsecond-input-widget.view.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFListSecondInputWidgetView extends AXFValueWidgetView {

    dataSource: AXFDataSourceOption;
    mode: string;
    direction: string;
    alignCheck: string;
    alignCheckNew:string;
    viewType: string;
    columns: number;
    alignment: string;
    color: string;
    bgColor: string;
    fontSize:string;
    constructor(protected cdr: ChangeDetectorRef) {
        super(cdr);
    }

    onRender(): void {
        this.cdr.markForCheck();
    }

    hasItem(item)
    {
        if ((this.mode=='multiple' && this.value && this.value.map(d=>d[this.dataSource.columns[0].fieldName]).indexOf(item[this.dataSource.columns[0].fieldName])>-1) ||
            (this.mode=='single' && this.value && 
               ((typeof(this.value)=="object" && this.value[this.dataSource.columns[0].fieldName]==item[this.dataSource.columns[0].fieldName]) || 
                (typeof(this.value)!="object" && this.value==item[this.dataSource.columns[0].fieldName]) ))         
           )
        return true; 
        else
        return false;
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
            this.cdr.detectChanges();
        }
    }

    refresh() {
        if (this.dataSource.mode === 'remote') {
            this.dataService.getList(
                this.dataSource.dataSource.name,
                this.dataSource.dataSource.params
            ).then(c => {
                this.dataSource.dataItems = c;
                super.refresh(); 
            });
        } else {
            super.refresh(); 
        }
    }

    getStyles(mode) {
        let currentSize=this.getSize();
        const styles = {
            'border-radius': mode === 'single' ? 100 + '%' : 0,
            'height':currentSize,
            'width':currentSize
        };
        return styles;
    }

    onCheckValueChange(item) {
        if (this.readonly) {
            return;
        }

        if (this.mode === 'single') {
            this.value = item;
        } else {
            if (!this.value) {
                this.value = [];
            }
            
            if (!this.value.includes(item)) {
                this.value = [...this.value, ...[item]];
            } else {
                this.value = this.value.filter(c => c !== item);
            }
        }
    }

    getSize() { 
        switch (this.fontSize) { 
            case 'xx-small':
            case 'x-small':
                return 13+'px';
            case 'smaller':
            case 'inherit':
                return 15+'px';
            case 'small':
                return 20+'px';
            case 'medium':
                return 25+'px';
            case 'large':
                return 30+'px';
            case 'larger':
                return 35+'px';
            case 'x-large':
            case 'xx-large':
                return 40+'px';
        }
    }
}
 