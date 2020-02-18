import { Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { AXFWidgetView } from '../../../config/widget'; 
import { AXFDataSourceOption } from '../../../../property-editor/editors/data-source/data-source.class';

@Component({
    templateUrl: './grid-input-widget.view.html',
    styleUrls: ['./grid-input-widget.view.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFGridInputWidgetView extends AXFWidgetView {

    @ViewChild("el") el: ElementRef<HTMLElement>;

    value: any[]=[];
    dataSource: AXFDataSourceOption;
    allowAddDelete: boolean;

    constructor(private cdr: ChangeDetectorRef) {
        super()
    }

    onRender(): void {
        if(this.dataSource.mode=="remote")
        {
            this.dataSource.dataSource.params.forEach(p => {
                if (typeof (p.value) === 'string' && p.value.startsWith('$')) {
                    p.value = this.resolveProperty(p.value);
                }
            });
            this.dataService.getList(this.dataSource.dataSource.name, this.dataSource.dataSource.params).then(items => {
                if (items && items.length) {
                    this.value= items; 
                    this.cdr.markForCheck();
                }  
            }); 
        }
        else
        {
            this.value=this.dataSource.dataItems;
            this.cdr.markForCheck();
        }
        
    }

    addRowClick()
    {

    }

    deleteClick(i)
    {
        
    }
}
